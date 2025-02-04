// src/components/List.jsx
import React, { useContext, useEffect, useState } from 'react';
import './List.css';
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const { foodList, setFoodList, token } = useContext(StoreContext);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/food/list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setList(response.data);
      } catch (err) {
        toast.error("Error fetching food list");
      }
    }
  };

  const removeFood = async (foodId) => {
    if (token) {
      try {
        const response = await axios.delete(`${API_URL}/food/delete/${foodId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.includes("deleted successfully")) {
          toast.success("Food item deleted successfully!");
          fetchList(); // Refresh the food list
        } else {
          toast.error("Error deleting food item");
        }
      } catch (error) {
        console.error("Error deleting food item:", error);
        toast.error("Error deleting food item");
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  const API_URL = 'http://localhost:8080/api';

  return (
    <div className="list add flex-col">
      <h2>All Foods List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${API_URL}/images/${item.image.split('/').pop()}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item.id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;