import React, { useState } from "react";
import "../App.css";
import { verifyUser } from "../services/auth";

function Verify({ email, onSuccess }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) {
      alert("Please enter the verification code.");
      return;
    }

    setLoading(true);

    try {
      await verifyUser(email, code);

      alert("Email verified successfully! Please login.");

      onSuccess();
    } catch (err) {
      console.error(err);
      alert(err.message || "Verification Failed");
    }

    setLoading(false);
  };

  return (
    <div className="app">

      <div className="app-bg-glow" />

      <div className="card auth-card">

        <div className="hero-eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">
            Email Verification
          </span>
        </div>

        <h1>
          Verify
          <br />
          <span>Account</span>
        </h1>

        <p className="subtitle">
          Enter the verification code sent to
        </p>

        <p
          style={{
            color: "#FF9900",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {email}
        </p>

        <div className="input-panel">

          <span className="input-label">
            Verification Code
          </span>

          <input
            className="auth-input"
            placeholder="Enter 6-digit OTP"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            className="auth-btn"
            onClick={handleVerify}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Verify;