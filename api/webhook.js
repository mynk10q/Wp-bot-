export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const msg = req.body.Body || "";

  let reply = "";

  if (msg.startsWith("971")) {
    reply = `📞 Number: ${msg}
👤 Name: Demo User
📍 Location: Gujarat
✅ Status: Active`;
  } else {
    reply = "Send valid number ❌";
  }

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Message>${reply}</Message>
    </Response>
  `);
}
