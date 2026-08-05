"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Halo! Tanya-tanya aja tentang Billy, project, atau skill-nya 👋" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const question = input.trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      const answer = res.ok ? data.answer : "Maaf, ada error. Coba lagi ya.";
      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Gagal terhubung ke server." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
      {open ? (
        <div
          style={{
            width: 320,
            height: 420,
            backgroundColor: "rgb(255, 255, 255)",
            opacity: 1,
            borderRadius: 12,
            boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid rgb(230,230,230)",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "rgb(17, 17, 17)",
              color: "rgb(255,255,255)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Tanya tentang Billy</span>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}
            >
              ✕
            </button>
          </div>

          <div
            ref={scrollRef}
            style={{
              flex: 1,
              padding: 12,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              backgroundColor: "rgb(255,255,255)",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor: m.role === "user" ? "rgb(17,17,17)" : "rgb(241,241,241)",
                  color: m.role === "user" ? "rgb(255,255,255)" : "rgb(17,17,17)",
                  padding: "8px 12px",
                  borderRadius: 10,
                  maxWidth: "80%",
                  fontSize: 14,
                }}
              >
                {m.text}
              </div>
            ))}
            {loading && <div style={{ fontSize: 13, color: "rgb(136,136,136)" }}>Mengetik...</div>}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid rgb(238,238,238)", backgroundColor: "rgb(255,255,255)" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ketik pertanyaan..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              style={{
                flex: 1,
                border: "none",
                padding: 10,
                fontSize: 14,
                outline: "none",
                backgroundColor: "rgb(255,255,255)",
                color: "rgb(17,17,17)",
              }}
            />
            <button
              onClick={sendMessage}
              style={{ padding: "0 16px", backgroundColor: "rgb(17,17,17)", color: "rgb(255,255,255)", border: "none", cursor: "pointer" }}
            >
              Kirim
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "rgb(17,17,17)",
            color: "rgb(255,255,255)",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          }}
        >
          💬
        </button>
      )}
    </div>
  );
}