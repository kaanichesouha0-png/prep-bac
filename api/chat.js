const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest", "gemini-2.5-flash-lite"];

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
      error:
        "Clé Gemini manquante côté serveur. Ajoute GEMINI_API_KEY dans Vercel → Settings → Environment Variables.",
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
        generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
      };
      if (systemInstruction) {
        body.system_instruction = { parts: [{ text: systemInstruction }] };
      }
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        lastError = data?.error?.message || `HTTP ${r.status} (${model})`;
        continue;
      }
      const text = (data?.candidates?.[0]?.content?.parts || [])
        .map((p) => p.text || "")
        .join("")
        .trim();
      if (!text) {
        lastError = `Réponse vide (${model})`;
        continue;
      }
      res.status(200).json({ text, model });
      return;
    } catch (err) {
      lastError = err.message || String(err);
    }
  }

  res.status(500).json({ error: lastError });
}
