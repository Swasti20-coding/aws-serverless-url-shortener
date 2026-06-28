import React, {useState} from "react"
import "../App.css"
import {loginUser} from "../services/auth"
import {toast} from "react-toastify"
import {FaEye, FaEyeSlash} from "react-icons/fa"

function Login({onSignup, onLoginSuccess}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields.")
      return
    }

    setLoading(true)

    try {
      const result = await loginUser(email, password)

      if (result.nextStep && result.nextStep.signInStep !== "DONE") {
        toast.warning("Additional authentication required.")
        return
      }

      toast.success("Login Successful")

      onLoginSuccess()
    } catch (err) {
      console.error(err)

      toast.error(err.message || "Login Failed")
    }

    setLoading(false)
  }

  return (
    <div className="app">
      <div className="app-bg-glow" />

      <div className="card auth-card">
        <div className="hero-eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Secure Authentication</span>
        </div>

        <h1>
          Welcome
          <br />
          <span>Back</span>
        </h1>

        <p className="subtitle">Login using your Cognito Account</p>

        <div className="input-panel">
          <span className="input-label">Email</span>

          <input
            className="auth-input"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className="input-label">Password</span>

          <div className="password-wrapper">
            <input
              className="auth-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin()
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

          <button
            className="auth-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              "Login"
            )}
          </button>

          <p
            className="switch-auth"
            onClick={onSignup}
          >
            Don't have an account?
            <span> Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
