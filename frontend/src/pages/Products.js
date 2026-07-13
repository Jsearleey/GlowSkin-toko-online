import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import "./products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="page-section">Memuat produk...</p>;

  return (
    <section className="page-section">
      <div className="toolbar">
        <h2>Semua Produk</h2>
        <input className="search" placeholder="Cari produk..." />
      </div>
      <div className="products-grid">
        {products.map((p) => (
  <ProductCard
    key={p._id}
    product={p}
    onClick={() => navigate(`/products/${p._id}`)}
  />
))}
      </div>
    </section>
  );
}