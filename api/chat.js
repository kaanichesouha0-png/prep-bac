const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3.7-flash",
  "gemini-flash-latest",
];

export const maxDuration = 30;

function extractText(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return parts.map((p) => p.text || "").join("").trim();
}

async function fetchWithTimeout(url, options, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const key = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!key) {
    res.status(500).json({
      error: "Clé Gemini manquante. Ajoute GEMINI_API_KEY dans Vercel (Settings → Environment Variables) puis Redeploy.",
    });
    return;
  }

  const { contents, systemInstruction } = req.body || {};
  if (!Array.isArray(contents) || contents.length === 0) {
    res.status(400).json({ error: "contents manquant" });
    return;
  }

  let lastError = "Gemini indisponible";
  for (const model of MODELS) {
    try {
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
      const r = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": key,
          },
          body: JSON.stringify(body),
        },
        12000
      );
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        lastError = data?.error?.message || `HTTP ${r.status} (${model})`;
        continue;
      }
      const text = extractText(data);
      if (!text) {
        lastError = `Réponse vide (${model})`;
        continue;
      }
      res.status(200).json({ text, model });
      return;
    } catch (err) {
      lastError = err.name === "AbortError" ? `Timeout (${model})` : err.message || String(err);
    }
  }

  res.status(500).json({ error: lastError });
}
