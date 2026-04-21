export async function POST(req) {
  try {
    const { message } = await req.json()

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Tu es Kuro AI, une IA intelligente, claire et puissante."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    })

    const data = await response.json()

    return Response.json({
      reply: data.choices?.[0]?.message?.content || "Erreur"
    })

  } catch (error) {
    return Response.json({ reply: "Erreur serveur" })
  }
}
