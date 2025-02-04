// src/components/Orders.jsx
import React, { useContext, useEffect, useState } from 'react';
import './Orders.css';
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllOrders = async () => {
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/order/list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        toast.error("Error fetching orders");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const API_URL = 'http://localhost:8080/api';

  return (
    <div className="order add">
      <h2>Order Page</h2>
      <div className="order-list">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={`${API_URL}/images/box.png`} alt="Box" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, idx) => {
                    if (idx === order.items.length - 1) {
                      return `${item.food.name} x ${item.quantity}`;
                    } else {
                      return `${item.food.name} x ${item.quantity}, `;
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select>
                <option value="Pending">Pending</option>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;