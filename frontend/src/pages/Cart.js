import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <section className="page-section">
        <h2>Keranjang</h2>
        <p>Keranjang kamu masih kosong.</p>
        <Link to="/products" className="btn" style={{ display: "inline-block", marginTop: 12 }}>
          Belanja Sekarang
        </Link>
      </section>
    );
  }

  return (
    <section className="page-section">
      <h2>Keranjang</h2>
      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p>Rp {item.price.toLocaleString("id-ID")}</p>
              <div className="qty-control">
                <button onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
              </div>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Hapus</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total: <strong>Rp {totalPrice.toLocaleString("id-ID")}</strong></p>
        <button className="btn" onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </section>
  );
}