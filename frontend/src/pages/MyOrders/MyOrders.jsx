import { useState, useEffect } from "react";

import "./MyOrders.css";
import { fetchOrdersAPI } from "../../api/orderApi";
import { assets } from "../../assets/assets";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await fetchOrdersAPI();
    if (response.success) {
      setOrders(response.orders);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders.map((order, idx) => {
          return (
            <div key={idx} className="my-orders-order">
              <img src={assets.parcel_icon} alt="parcel-icon" />
              <p>
                {order.items.map(({ name, quantity }, i) => {
                  return name + " x " + quantity + ", ";
                })}
              </p>
              <p>${order.amount}</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
