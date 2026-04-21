"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ IMPORTANT
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log(data); // debug

      setChat([
        ...chat,
        { q: message, a: data.reply || data.content || data.error },
      ]);

      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
      style={{
        background: "#111",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "green" }}>Kuro AI</h1>

      <input
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
        }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écris un message..."
      />

      <button
        onClick={sendMessage}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
        }}
      >
        Envoyer
      </button>

      <div style={{ marginTop: "20px" }}>
        {chat.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p>
              <strong>Toi :</strong> {msg.q}
            </p>
            <p>
              <strong>IA :</strong> {msg.a}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
