export default async function handler(req, res) {
  try {
    const msg = req.body.Body?.trim();

    if (!msg) {
      return res.send("Send a number ❌");
    }

    const url = `https://mynkapi.amit1100941.workers.dev/api?key=sex&type=mobile&term=${msg}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success || !data.result || data.result.length === 0) {
      return res.send("❌ No data found");
    }

    let reply = "";

    data.result.forEach((user, i) => {
      reply += `
🔎 Result ${i + 1}

📱 Number: ${user.mobile}
👤 Name: ${user.name}
👨 Father: ${user.father_name}
🏠 Address: ${user.address}
📍 Circle: ${user.circle}
🆔 ID: ${user.id_number}

------------------------
`;
    });

    res.setHeader("Content-Type", "text/xml");
    res.send(`<Response><Message>${reply}</Message></Response>`);

  } catch (err) {
    res.send("⚠️ Error occurred");
  }
}
