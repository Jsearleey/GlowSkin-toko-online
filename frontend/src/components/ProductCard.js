import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./productCard.css";

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();
  const { image, name, price } = product;
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <img
        src={image || "https://placehold.co/300x200/fce4ec/333?text=GlowSkin"}
        alt={name}
        className="product-image"
        onClick={onClick}
      />
      <div className="product-info">
        <h3 className="product-title" onClick={onClick}>{name}</h3>
        <p className="product-price">Rp {price.toLocaleString("id-ID")}</p>
        <div className="card-actions">
          <button className="btn btn-outline" onClick={onClick}>Lihat Detail</button>
          <button
            className={`btn ${added ? "btn-added" : ""}`}
            onClick={handleAdd}
            disabled={added}
          >
            {added ? "✓ Ditambahkan" : "+ Keranjang"}
          </button>
        </div>
      </div>
    </article>
  );
}