import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import "./home.css";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((res) => setFeatured(res.data.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Rawat Kulitmu, <span>Bersinar Setiap Hari</span></h1>
          <p>Produk skincare pilihan dengan bahan aman dan berkualitas, untuk semua jenis kulit.</p>
          <button className="btn hero-btn" onClick={() => navigate("/products")}>
            Belanja Sekarang
          </button>
        </div>
      </section>

      <section className="trust-bar">
        <div className="trust-item">✅ BPOM Terdaftar</div>
        <div className="trust-item">🚚 Gratis Ongkir Min. 100rb</div>
        <div className="trust-item">🌿 Bahan Aman & Teruji</div>
        <div className="trust-item">↩️ Garansi Original</div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <h2>Produk Unggulan</h2>
          <span className="see-all" onClick={() => navigate("/products")}>Lihat Semua →</span>
        </div>
        {featured.length === 0 ? (
          <p>Memuat produk...</p>
        ) : (
          <div className="products-grid">
            {featured.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onClick={() => navigate(`/products/${p._id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}