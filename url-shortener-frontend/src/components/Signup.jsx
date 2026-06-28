import React, { useState } from "react";
import "../App.css";
import { registerUser } from "../services/auth";

function Signup({ onLogin, onVerify }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await registerUser(email, password);

      alert("Verification code sent to your email.");

      onVerify(email);
    } catch (err) {
      console.error(err);

      alert(err.message || "Signup Failed");
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
            Create Account
          </span>
        </div>

        <h1>
          Get
          <br />
          <span>Started</span>
        </h1>

        <p className="subtitle">
          Create your AWS Cognito account
        </p>

        <div className="input-panel">

          <span className="input-label">
            Email
          </span>

          <input
            className="auth-input"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className="input-label">
            Password
          </span>

          <input
            className="auth-input"
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span className="input-label">
            Confirm Password
          </span>

          <input
            className="auth-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="auth-btn"
            onClick={handleSignup}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <p
            className="switch-auth"
            onClick={onLogin}
          >
            Already have an account?
            <span> Login</span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;