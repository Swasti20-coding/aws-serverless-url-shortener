import React, { useState } from "react";
import "../App.css";
import {
  forgotPassword,
  resetUserPassword,
} from "../services/auth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const sendOTP = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      await forgotPassword(email);

      toast.success("OTP sent to your email.");

      setCodeSent(true);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to send OTP.");
    }

    setLoading(false);
  };

  const handleReset = async () => {
    if (
      !otp.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await resetUserPassword(
        email,
        otp,
        newPassword
      );

      toast.success(
        "Password reset successfully."
      );

      onBack();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Reset failed.");
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
            Account Recovery
          </span>
        </div>

        <h1>
          Forgot
          <br />
          <span>Password</span>
        </h1>

        <p className="subtitle">
          Reset your password securely
        </p>

        <div className="input-panel">

          <span className="input-label">
            Email
          </span>

          <input
            className="auth-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            disabled={codeSent}
          />

          {!codeSent ? (
            <button
              className="auth-btn"
              onClick={sendOTP}
              disabled={loading}
            >
              {loading
                ? "Sending OTP..."
                : "Send OTP"}
            </button>
          ) : (
            <>

              <span className="input-label">
                Verification Code
              </span>

              <input
                className="auth-input"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
              />

              <span className="input-label">
                New Password
              </span>

              <div className="password-wrapper">
                <input
                  className="auth-input"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>

              <span className="input-label">
                Confirm Password
              </span>

              <div className="password-wrapper">
                <input
                  className="auth-input"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>

              <button
                className="auth-btn"
                onClick={handleReset}
                disabled={loading}
              >
                {loading
                  ? "Resetting..."
                  : "Reset Password"}
              </button>
            </>
          )}

          <p
            className="switch-auth"
            onClick={onBack}
          >
            ← Back to Login
          </p>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;