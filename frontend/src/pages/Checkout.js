import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./cart.css";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <section className="page-section">
        <h2>Pesanan Berhasil! 🎉</h2>
        <p>Terima kasih, pesananmu sedang diproses.</p>
        <button className="btn" onClick={() => navigate("/products")}>Kembali Belanja</button>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="page-section">
        <p>Keranjang kosong, tidak ada yang bisa di-checkout.</p>
      </section>
    );
  }

  return (
    <section className="page-section">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="name" placeholder="Nama Lengkap" value={form.name} onChange={handleChange} required />
        <input name="address" placeholder="Alamat Pengiriman" value={form.address} onChange={handleChange} required />
        <input name="phone" placeholder="Nomor Telepon" value={form.phone} onChange={handleChange} required />
        <p>Total Bayar: <strong>Rp {totalPrice.toLocaleString("id-ID")}</strong></p>
        <button className="btn" type="submit">Konfirmasi Pesanan</button>
      </form>
    </section>
  );
}