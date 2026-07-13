import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./header.css";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="brand">✨ GlowSkin</div>
      <nav className="nav">
        <Link to="/">Beranda</Link>
        <Link to="/products">Produk</Link>
        <Link to="/cart">Keranjang ({totalItems})</Link>
      </nav>
    </header>
  );
}