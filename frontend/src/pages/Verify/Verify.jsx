// src/components/Verify.jsx
import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const orderId = searchParams.get("orderId");
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    if (token && orderId) {
      try {
        const response = await axios.post(`${API_URL}/order/verify`, {}, {
          params: { success, orderId },
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.includes("verification updated")) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token, orderId, navigate]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;