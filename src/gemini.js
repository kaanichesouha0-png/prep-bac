const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3.7-flash",
  "gemini-flash-latest",
];

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

function extractText(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const text = parts.map((p) => p.text || "").join("").trim();
  if (text) return text;
  const block = data?.promptFeedback?.blockReason;
  if (block) throw new Error(`Réponse bloquée (${block})`);
  return "";
}

async function fetchWithTimeout(url, options, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } catch (err) {
    if (err.name === "AbortError") throw new Error("Délai dépassé. Réessaie dans un instant.");
    throw err;
  } finally {
    clearTimeout(t);
  }
}

async function callRestApi(model, key, contents, systemInstruction) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const body = {
    contents,
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 4096,
      thinkingConfig: { thinkingBudget: 0 },
    },
  };
  if (systemInstruction) {
    body.system_instruction = { parts: [{ text: systemInstruction }] };
  }
  const res = await fetchWithTimeout(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify(body),
    },
    18000
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.error?.message || `HTTP ${res.status}`;
    throw new Error(`${model}: ${message}`);
  }
  const text = extractText(data);
  if (!text) throw new Error(`${model}: réponse vide`);
  return text;
}

async function callServerApi(contents, systemInstruction) {
  const res = await fetchWithTimeout(
    "/api/chat",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents, systemInstruction }),
    },
    25000
  );
  const data = await res.json().catch(() => ({}));
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(data.error || `API ${res.status}`);
  return data.text || null;
}

export async function askGemini({ messages, systemInstruction }) {
  const contents = buildGeminiContents(messages);
  const key = import.meta.env.VITE_GEMINI_API_KEY;

  let lastError = null;
  try {
    const fromServer = await callServerApi(contents, systemInstruction);
    if (fromServer) return fromServer;
  } catch (err) {
    lastError = err;
  }

  if (key) {
    for (const model of MODELS) {
      try {
        return await callRestApi(model, key, contents, systemInstruction);
      } catch (err) {
        lastError = err;
      }
    }
  }

  throw lastError || new Error(
    "Gemini n'a pas répondu. Vérifie GEMINI_API_KEY et VITE_GEMINI_API_KEY dans Vercel, puis Redeploy."
  );
}

export function parseFlashcardsJson(text) {
  if (!text) return [];
  const match = String(text).match(/\[[\s\S]*\]/);
  if (!match) return [];
  try {
    const cards = JSON.parse(match[0]);
    if (!Array.isArray(cards)) return [];
    return cards
      .filter((c) => c && (c.q || c.question) && (c.a || c.answer || c.reponse))
      .map((c, i) => ({
        id: Date.now() + i,
        q: String(c.q || c.question).trim(),
        a: String(c.a || c.answer || c.reponse).trim(),
      }));
  } catch {
    return [];
  }
}

export function bacTutorPrompt({ firstName, section, option, techniqueTrack }) {
  const filiere = [section, techniqueTrack, option && option !== "Aucune" ? `option ${option}` : ""]
    .filter(Boolean)
    .join(" · ");
  return `Tu es BacPrep, tuteur du baccalauréat tunisien (4ème année).
Élève : ${firstName || "élève"} (${filiere || "section non précisée"}).
Réponds en français (sauf question en arabe/anglais). Sois clair, avec étapes et formules.
Si photo d'exercice : transcris, résous, explique.
Si flashcards : JSON tableau [{"q":"...","a":"..."}] puis version lisible.`;
}
