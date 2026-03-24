import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { placeOrderAPI } from "../../api/orderApi";
import { useEffect } from "react";

export default function PlaceOrder() {
  const { food_list, getTotalCartAmount, cartItems } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const subTotal = getTotalCartAmount();
  const deliveryFee = subTotal ? 2 : 0;

  useEffect(() => {
    if (!subTotal) {
      navigate("/");
    }
  }, []);

  const [data, setData] = useState({
    firstName: "ritik",
    lastName: "kumar",
    email: "ritikaryan10@gmail.com",
    address: "IIIT Bhubaneswar",
    city: "Bhubaneswar",
    state: "Odisha",
    zipcode: "751003",
    country: "India",
    phone: "1234567890",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    const orderData = {
      address: data,
      items: orderItems,
      amount: subTotal + deliveryFee,
    };

    const response = await placeOrderAPI(orderData);

    if (response.success) {
      const { session_url } = response;
      window.location.replace(session_url);
    } else {
      alert("Something went wrong, cannot place order");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          onChange={onChangeHandler}
          value={data.address}
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip code"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
          />
        </div>
        <input
          type="tel"
          placeholder="Phone"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
        />
      </div>
      <div className="place-order-right">
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
              <p>${deliveryFee}</p>
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
              disabled={subTotal === 0}
              type="submit"
            >
              PROCEED TO PAY
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
