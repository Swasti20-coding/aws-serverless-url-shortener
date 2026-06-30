import React, { useState } from "react";
import "../App.css";
import { registerUser } from "../services/auth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup({ onLogin, onVerify }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passwordValid = Object.values(rules).every(Boolean);

  const handleSignup = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    if (!passwordValid) {
      toast.error("Please satisfy all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser(email, password);

      toast.success("Verification code sent to your email.");

      onVerify(email);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Signup Failed");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="app-bg-glow" />

      <div className="card auth-card">
        <div className="hero-eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Create Account</span>
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

          <span className="input-label">Email</span>

          <input
            className="auth-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSignup();
            }}
          />

          <span className="input-label">Password</span>

          <div className="password-wrapper">
            <input
              className="auth-input"
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSignup();
              }}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="password-rules">

            <div className={rules.length ? "valid" : "invalid"}>
              {rules.length ? "✓" : "✗"} Minimum 8 characters
            </div>

            <div className={rules.uppercase ? "valid" : "invalid"}>
              {rules.uppercase ? "✓" : "✗"} One uppercase letter
            </div>

            <div className={rules.lowercase ? "valid" : "invalid"}>
              {rules.lowercase ? "✓" : "✗"} One lowercase letter
            </div>

            <div className={rules.number ? "valid" : "invalid"}>
              {rules.number ? "✓" : "✗"} One number
            </div>

            <div className={rules.special ? "valid" : "invalid"}>
              {rules.special ? "✓" : "✗"} One special character
            </div>

          </div>

          <span className="input-label">Confirm Password</span>

          <div className="password-wrapper">
            <input
              className="auth-input"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSignup();
              }}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            className="auth-btn"
            onClick={handleSignup}
            disabled={loading}
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