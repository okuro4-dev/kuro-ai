"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat([...chat, { q: message, a: data.reply || data.error }]);
    setMessage("");
  };

  return (
    <main style={{ background: "#111", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: "#6b8e23" }}>Kuro AI</h1>

      <div>
        {chat.map((c, i) => (
          <div key={i}>
            <p><b>Q:</b> {c.q}</p>
            <p><b>A:</b> {c.a}</p>
          </div>
        ))}
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <button onClick={sendMessage} style={{ marginTop: "10px" }}>
        Envoyer
      </button>
    </main>
  );
}
