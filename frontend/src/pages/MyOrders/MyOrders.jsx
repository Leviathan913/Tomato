// src/components/MyOrders.jsx
import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/order/list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const trackOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={`${API_URL}/images/parcel_icon.png`} alt="Parcel" />
              <p>
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return `${item.food.name} x ${item.quantity}`;
                  } else {
                    return `${item.food.name} x ${item.quantity}, `;
                  }
                })}
              </p>
              <p>${order.amount}</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={() => trackOrder(order.id)}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;