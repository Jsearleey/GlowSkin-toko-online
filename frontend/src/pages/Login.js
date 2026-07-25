import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useAuth } from "../context/AuthContext";
import "./auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(form);
      login(res.data.token, res.data.user);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal, coba lagi.");
    }
  };

  return (
    <section className="page-section auth-section">
      <h2>Masuk ke GlowSkin</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <p className="auth-error">{error}</p>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn" type="submit">Masuk</button>
      </form>
      <p className="auth-switch">
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </section>
  );
}