import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "./Orders.css";
import { listOrders, orderStatus } from "../../api/ordersApi";
import { assets } from "../../assets/assets";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await listOrders();
    if (response.success) {
      setOrders(response.orders);
    } else {
      toast.error("Failed to fetch orders");
    }
  };

  const onChangeHandler = async (e, orderId) => {
    const response = await orderStatus(e.target.value, orderId);
    if (response.success) fetchAllOrders();
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, idx) => {
          const {
            firstName,
            lastName,
            address,
            city,
            state,
            country,
            zipcode,
            phone,
          } = order.address;
          return (
            <div key={idx} className="order-item">
              <img src={assets.parcel_icon} alt="parcel-icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map(({ name, quantity }, i) => {
                    return name + " x " + quantity + ", ";
                  })}
                </p>
                <p className="order-item-name">{firstName + " " + lastName}</p>
                <div className="order-item-address">
                  <p>{address + ", "}</p>
                  <p>{city + ", " + state + ", " + country + ", " + zipcode}</p>
                </div>
                <p className="order-item-phone">{phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select
                value={order.status}
                onChange={(e) => onChangeHandler(e, order._id)}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}
