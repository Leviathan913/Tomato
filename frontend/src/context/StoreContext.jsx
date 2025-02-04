// src/context/StoreContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const API_URL = 'http://localhost:8080/api';

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = async (userId, foodId) => {
    if (!cartItems[foodId]) {
      setCartItems((prev) => ({ ...prev, [foodId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [foodId]: prev[foodId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(`${API_URL}/cart/add`, {}, {
          params: { userId, foodId },
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (userId, foodId) => {
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
          params: { userId, foodId },
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

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${API_URL}/food/list`);
      setFoodList(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const loadCartData = async (userId, token) => {
    try {
      const response = await axios.get(`${API_URL}/cart/get`, {
        params: { userId },
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.reduce((acc, cartItem) => ({
        ...acc,
        [cartItem.food.id]: cartItem.quantity
      }), {}));
    } catch (error) {
      setError(error.message);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password
      });
      if (response.data.startsWith("Login successful.")) {
        const token = response.data.split('.')[1];
        setToken(token);
        localStorage.setItem("token", token);
        await loadCartData(1, token); 
        return true;
      } else {
        setErrorMessage(response.data);
        return false;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Login failed. Please try again.");
      return false;
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/user/register`, {
        name,
        email,
        password
      });
      if (response.data.startsWith("Registration successful.")) {
        alert("Registration successful. Please log in.");
        setCurrState("Login");
        return true;
      } else {
        setErrorMessage(response.data);
        return false;
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("Registration failed. Please try again.");
      return false;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(1, storedToken);
      }
    };
    loadData();
  }, []);

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loginUser,
    registerUser
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;