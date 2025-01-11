const express = require("express");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

app.post("/generate", async (req, res) => {
  const { name, vpa, amount } = req.body;

  if (!name || !vpa || !amount) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const upiString = `upi://pay?pa=${vpa}&pn=${name}&am=${amount}&cu=INR`;
  try {
    const qrCode = await QRCode.toDataURL(upiString);
    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: "Error generating QR code" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
