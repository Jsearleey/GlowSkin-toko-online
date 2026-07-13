import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api";
import { useCart } from "../context/CartContext";
import "./productDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (!product) return <p className="page-section">Memuat detail...</p>;

  return (
    <section className="page-section detail-layout">
      <img src={product.image} alt={product.name} className="detail-image" />
      <div className="detail-info">
        <h2>{product.name}</h2>
        <p className="detail-desc">{product.description}</p>
        <p className="detail-price">Rp {product.price.toLocaleString("id-ID")}</p>
        <p className="detail-stock">Stok: {product.stock}</p>
        <button
          className={`btn ${added ? "btn-added" : ""}`}
          onClick={handleAdd}
          disabled={added}
        >
          {added ? "✓ Ditambahkan ke Keranjang" : "+ Tambah ke Keranjang"}
        </button>
      </div>
    </section>
  );
}