// Jalankan sekali (atau tiap kali data about-me.json berubah):
//   node scripts/generate-embeddings.mjs
//
// Butuh HF_API_KEY di environment (Hugging Face Inference API, gratis).
// Hasilnya disimpan ke data/embeddings.json biar nggak perlu di-generate ulang tiap request.

import fs from "fs";
import path from "path";

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL = "sentence-transformers/all-MiniLM-L6-v2";

if (!HF_API_KEY) {
  console.error("Set HF_API_KEY dulu di environment variable.");
  process.exit(1);
}

async function embed(text) {
  const res = await fetch(
    `https://api-inference.huggingface.co/pipeline/feature-extraction/${MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
    }
  );

  if (!res.ok) {
    throw new Error(`HF API error: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  // Model ini bisa balikin bentuk [tokens][dims] atau langsung [dims] tergantung versi,
  // jadi kita rata-rata-kan kalau ternyata per-token (mean pooling sederhana).
  if (Array.isArray(data[0])) {
    const dims = data[0].length;
    const avg = new Array(dims).fill(0);
    for (const tokenVec of data) {
      for (let i = 0; i < dims; i++) avg[i] += tokenVec[i];
    }
    return avg.map((v) => v / data.length);
  }
  return data;
}

async function main() {
  const dataPath = path.join(process.cwd(), "lib", "about-me.json");
  const entries = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const results = [];
  for (const entry of entries) {
    console.log(`Embedding: ${entry.id}`);
    const vector = await embed(`${entry.title}\n${entry.content}`);
    results.push({ ...entry, vector });
  }

  const outPath = path.join(process.cwd(), "lib", "embeddings.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`Selesai. Disimpan ke ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
