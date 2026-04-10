export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const number = req.body.Body || "";

  let reply = "❌ No data found";

  try {
    const response = await fetch(
      `https://mynkapi.amit1100941.workers.dev/api?key=sex&type=mobile&term=${number}`
    );

    const data = await response.json();

    // 👇 agar API me result array hai
    if (data && data.result && data.result.length > 0) {
      reply = "";

      data.result.forEach((item, i) => {
        reply += `
🔎 Result ${i + 1}

👤 Name: ${item.name || "N/A"}
👨‍👦 Father: ${item.father_name || "N/A"}
🏠 Address: ${item.address || "N/A"}
📍 Circle: ${item.circle || "N/A"}
🆔 Aadhaar: ${item.aadhaar || "N/A"}

-------------------
`;
      });
    } else {
      reply = "❌ No data found";
    }
  } catch (e) {
    reply = "⚠️ API Error";
  }

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Message>${reply}</Message>
    </Response>
  `);
}
