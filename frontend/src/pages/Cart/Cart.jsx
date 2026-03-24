import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, getTotalCartAmount, food_list, removeFromCart } =
    useContext(StoreContext);

  const subTotal = getTotalCartAmount();
  const deliveryFee = subTotal ? 2 : 0;

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, idx) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={idx}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image_url} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subTotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${subTotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${subTotal + deliveryFee}</b>
            </div>
            <button
              className={
                subTotal ? "checkout-btn-enable" : "checkout-btn-disable"
              }
              onClick={() => navigate("/order")}
              disabled={subTotal === 0}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
