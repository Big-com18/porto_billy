import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

const HF_API_KEY = process.env.HF_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const GROQ_MODEL = "openai/gpt-oss-120b"; // llama-3.3-70b-versatile sudah deprecated per Agustus 2026

type Entry = {
  id: string;
  title: string;
  content: string;
  vector: number[];
};

function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function embedQuery(text: string): Promise<number[]> {
  const res = await fetch(
    `https://router.huggingface.co/hf-inference/models/${HF_MODEL}/pipeline/feature-extraction`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
    }
  );
  if (!res.ok) throw new Error(`HF API error: ${res.status}`);
  const data = await res.json();
  if (Array.isArray(data[0])) {
    const dims = data[0].length;
    const avg = new Array(dims).fill(0);
    for (const tokenVec of data as number[][]) {
      for (let i = 0; i < dims; i++) avg[i] += tokenVec[i];
    }
    return avg.map((v) => v / data.length);
  }
  return data;
}

function loadEmbeddings(): Entry[] {
  const p = path.join(process.cwd(), "lib", "embeddings.json");
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    if (!question || typeof question !== "string") {
      return Response.json({ error: "Pertanyaan kosong." }, { status: 400 });
    }

    const entries = loadEmbeddings();

    // 1 & 2. Coba cari entry paling relevan lewat Hugging Face (top 4).
    // Kalau Hugging Face gagal (kuota habis / error lain), jangan matikan chatbot:
    // langsung pakai SEMUA entry sebagai konteks. Datanya kecil, jadi muat di prompt.
    let selected: Entry[];
    try {
      const queryVector = await embedQuery(question);
      selected = entries
        .map((e) => ({ ...e, score: cosineSimilarity(queryVector, e.vector) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);
    } catch (err) {
      console.error("Embedding gagal, pakai semua entry sebagai konteks:", err);
      selected = entries;
    }

    const context = selected
      .map((e) => `## ${e.title}\n${e.content}`)
      .join("\n\n");

    // 3. Kirim ke Groq dengan context
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah asisten AI di website portofolio Billy. Jawab pertanyaan pengunjung HANYA berdasarkan konteks yang diberikan tentang Billy. Jika informasi tidak ada di konteks, katakan kamu tidak punya info itu. Jawab singkat, ramah, dan dalam Bahasa Indonesia kecuali ditanya dalam bahasa lain. PENTING: Jangan gunakan format markdown apapun (jangan pakai tanda bintang **, tanda pagar #, atau tanda strip - untuk bullet list). Tulis jawaban dalam paragraf biasa yang mengalir natural, seperti sedang mengetik pesan chat biasa.",
          },
          {
            role: "user",
            content: `Konteks tentang Billy:\n${context}\n\nPertanyaan pengunjung: ${question}`,
          },
        ],
        temperature: 0.4,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      throw new Error(`Groq API error: ${groqRes.status} ${errText}`);
    }

    const groqData = await groqRes.json();
    const answer = groqData.choices?.[0]?.message?.content ?? "Maaf, tidak ada jawaban.";

    // 4. Kirim log ke Google Sheet.
    // Pakai await supaya di Vercel (serverless) request log nggak keburu terputus
    // begitu response dikirim. Kalau gagal, cukup dicatat, user tetap dapat jawaban.
    const SHEET_WEBHOOK_URL = process.env.SHEET_WEBHOOK_URL;
    if (SHEET_WEBHOOK_URL) {
      try {
        await fetch(SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, answer }),
        });
      } catch (err) {
        console.error("Gagal kirim log ke sheet:", err);
      }
    }

    return Response.json({ answer });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Terjadi kesalahan di server." }, { status: 500 });
  }
}