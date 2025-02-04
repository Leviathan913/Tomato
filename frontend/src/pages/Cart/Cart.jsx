// src/components/Cart.jsx
import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import Title from "../Title/Title";
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const Cart = () => {
  const { foodList, cartItems, setCartItems, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/cart/get`, {
            params: { userId: 1 }, // Assuming user ID is 1 for now
            headers: { Authorization: `Bearer ${token}` }
          });
          setCartData(response.data);
          setCartItems(response.data.reduce((acc, cartItem) => ({
            ...acc,
            [cartItem.food.id]: cartItem.quantity
          }), {}));
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [token, setCartItems]);

  const removeFromCart = async (foodId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[foodId] > 1) {
        newCartItems[foodId] -= 1;
      } else {
        delete newCartItems[foodId];
      }
      return newCartItems;
    });

    if (token) {
      try {
        await axios.post(`${API_URL}/cart/remove`, {}, {
          params: { userId: 1, foodId },
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product.id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        <hr />
        {cartData.map((cartItem, index) => {
          const food = foodList.find(f => f.id === cartItem.food.id);
          if (food) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${API_URL}/images/${food.image.split('/').pop()}`} alt={food.name} />
                  <p>{food.name}</p>
                  <p>${food.price}</p>
                  <p>{cartItem.quantity}</p>
                  <p>${food.price * cartItem.quantity}</p>
                  <p onClick={() => removeFromCart(food.id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <Title text1={"CART"} text2={"TOTAL"} />
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
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
};

export default Cart;