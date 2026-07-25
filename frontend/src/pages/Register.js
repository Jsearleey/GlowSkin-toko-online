import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { useAuth } from "../context/AuthContext";
import "./auth.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await registerUser(form);
      login(res.data.token, res.data.user);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal, coba lagi.");
    }
  };

  return (
    <section className="page-section auth-section">
      <h2>Daftar Akun GlowSkin</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <p className="auth-error">{error}</p>}
        <input
          name="name"
          placeholder="Nama Lengkap"
          value={form.name}
          onChange={handleChange}
          required
        />
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
        <button className="btn" type="submit">Daftar</button>
      </form>
      <p className="auth-switch">
        Sudah punya akun? <Link to="/login">Masuk di sini</Link>
      </p>
    </section>
  );
}