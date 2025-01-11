import React, { useState } from "react";
import axios from "axios";

const UPIQrGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    vpa: "",
    amount: "",
  });
  const [qrCode, setQrCode] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/generate", formData);
      setQrCode(response.data.qrCode);
    } catch (error) {
      alert("Failed to generate QR code.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Create Your UPI QRCode</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter your name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Enter your VPA: </label>
          <input
            type="text"
            name="vpa"
            value={formData.vpa}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Enter the amount: </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create QRCode</button>
      </form>
      {qrCode && (
        <div style={{ marginTop: "20px" }}>
          <h3>Your QR Code:</h3>
          <img src={qrCode} alt="UPI QR Code" />
        </div>
      )}
    </div>
  );
};

export default UPIQrGenerator;
