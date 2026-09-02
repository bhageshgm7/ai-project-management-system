import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("token/", {
        username,
        password,
      });

      login(response.data.access, response.data.refresh);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        setError(
          err.response.data?.detail ||
            `Server error: ${err.response.status}`
        );
      } else {
        setError("Cannot connect to the Django server.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>

      <div className="login-card">
        <div className="login-icon">✦</div>

        <div className="login-heading">
          <p className="login-badge">AI POWERED</p>

          <h1>AI Project</h1>
          <h1>Management System</h1>

          <p className="login-subtitle">
            Manage projects, tasks and workflows intelligently.
          </p>
        </div>

        <div className="login-divider"></div>

        <h2>Welcome back</h2>

        <p className="login-description">
          Sign in to continue to your workspace.
        </p>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
            autoComplete="username"
            required
          />

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            required
          />

          <button type="submit">
            <span>Login</span>
            <span className="login-arrow">→</span>
          </button>
        </form>

        <p className="login-footer">
          Secure authentication powered by JWT
        </p>

        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;