const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest", "gemini-2.5-flash-lite"];

function dataUrlToInline(dataUrl) {
  if (!dataUrl || typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) return null;
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return { inline_data: { mime_type: match[1], data: match[2] } };
}

export function buildGeminiContents(messages) {
  const contents = [];
  for (const msg of messages) {
    if (msg.sender === "bot" && contents.length === 0) continue;
    const role = msg.sender === "user" ? "user" : "model";
    const parts = [];
    const inline = dataUrlToInline(msg.image);
    if (inline) parts.push(inline);
    const text = (msg.text || "").trim();
    if (text) parts.push({ text });
    else if (inline) parts.push({ text: "Analyse cette image d'exercice ou de cours. Explique et corrige si besoin." });
    if (!parts.length) continue;
    contents.push({ role, parts });
  }
  if (!contents.length || contents[0].role !== "user") {
    contents.unshift({ role: "user", parts: [{ text: "Bonjour." }] });
  }
  return contents;
}

async function callRestApi(model, key, contents, systemInstruction) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
  const body = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    },
  };
  if (systemInstruction) {
    body.system_instruction = { parts: [{ text: systemInstruction }] };
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.error?.message || `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  const text = (data?.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text || "")
    .join("")
    .trim();
  if (!text) throw new Error("Réponse vide de Gemini");
  return text;
}

async function callServerApi(contents, systemInstruction) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents, systemInstruction }),
  });
  if (res.status === 404) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `API ${res.status}`);
  }
  return data.text;
}

export async function askGemini({ messages, systemInstruction }) {
  const contents = buildGeminiContents(messages);
  const key = import.meta.env.VITE_GEMINI_API_KEY;

  try {
    const fromServer = await callServerApi(contents, systemInstruction);
    if (fromServer) return fromServer;
  } catch (err) {
    if (key) {
      // fallback client
    } else {
      throw err;
    }
  }

  if (!key) {
    throw new Error(
      "Clé Gemini manquante. Ajoute VITE_GEMINI_API_KEY (et/ou GEMINI_API_KEY) dans Vercel → Settings → Environment Variables, puis redéploie."
    );
  }

  let lastError = null;
  for (const model of MODELS) {
    try {
      return await callRestApi(model, key, contents, systemInstruction);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error("Gemini indisponible");
}

export function bacTutorPrompt({ firstName, section, option, techniqueTrack }) {
  const filiere = [section, techniqueTrack, option && option !== "Aucune" ? `option ${option}` : ""]
    .filter(Boolean)
    .join(" · ");
  return `Tu es BacPrep, un tuteur d'excellence pour le baccalauréat tunisien.
Élève : ${firstName || "élève"} (${filiere || "section non précisée"}).
Règles :
- Réponds en français, sauf si la question est en arabe ou en anglais.
- Sois clair, structuré, et pédagogique (étapes, formules, pièges du bac).
- Tu n'as AUCUNE limite de longueur : développe autant que nécessaire.
- Si on t'envoie une photo d'exercice, lis-la, transcris, résous et explique.
- Si on demande des flashcards, donne un JSON tableau d'objets { "q", "a" } puis une version lisible.
- Reste dans le programme tunisien de 4ème année / bac.`;
}
