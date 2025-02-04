// src/components/Add.jsx
import React, { useContext, useEffect, useState } from "react";
import "./Add.css";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const Add = () => {
  const { foodList, setFoodList, token } = useContext(StoreContext);
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoodList = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/food/list`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setFoodList(response.data);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchFoodList();
  }, [token, setFoodList]);

  const handleImageChange = (event) => {
    setNewFood(prev => ({ ...prev, image: event.target.files[0] }));
  };

  const addFood = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append('name', newFood.name);
    formData.append('description', newFood.description);
    formData.append('category', newFood.category);
    formData.append('price', newFood.price);
    formData.append('image', newFood.image);

    try {
      const response = await axios.post(`${API_URL}/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.includes("added successfully")) {
        alert("Food item added successfully!");
        setNewFood({
          name: "",
          description: "",
          category: "",
          price: "",
          image: null,
        });
        fetchFoodList(); // Refresh the food list
      } else {
        setError("Error adding food item.");
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      setError("Error adding food item.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodList = async () => {
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/food/list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFoodList(response.data);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="add">
      <h2>Add Food Item</h2>
      <form onSubmit={addFood} className="add-form">
        <div className="add-product-name">
          <label>Name:</label>
          <input
            required
            name="name"
            value={newFood.name}
            onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
            type="text"
            placeholder="Enter food name"
          />
        </div>
        <div className="add-product-description">
          <label>Description:</label>
          <textarea
            required
            name="description"
            value={newFood.description}
            onChange={(e) => setNewFood(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter food description"
          />
        </div>
        <div className="add-category">
          <label>Category:</label>
          <input
            required
            name="category"
            value={newFood.category}
            onChange={(e) => setNewFood(prev => ({ ...prev, category: e.target.value }))}
            type="text"
            placeholder="Enter food category"
          />
        </div>
        <div className="add-price">
          <label>Price:</label>
          <input
            required
            name="price"
            value={newFood.price}
            onChange={(e) => setNewFood(prev => ({ ...prev, price: e.target.value }))}
            type="number"
            step="0.01"
            placeholder="Enter food price"
          />
        </div>
        <div className="add-img-upload">
          <label>Image:</label>
          <input
            required
            name="image"
            onChange={handleImageChange}
            type="file"
            accept="image/*"
          />
        </div>
        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Food Item"}
        </button>
      </form>
    </div>
  );
};

export default Add;