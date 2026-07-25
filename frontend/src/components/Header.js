import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./header.css";

export default function Header() {
  const { totalItems } = useCart();
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="brand">✨ GlowSkin</div>
      <nav className="nav">
        <Link to="/">Beranda</Link>
        <Link to="/products">Produk</Link>
        <Link to="/cart">Keranjang ({totalItems})</Link>
        {isLoggedIn ? (
          <>
            <span className="nav-user">Hai, {user.name}</span>
            <button className="nav-logout" onClick={handleLogout}>Keluar</button>
          </>
        ) : (
          <Link to="/login">Masuk</Link>
        )}
      </nav>
    </header>
  );
}