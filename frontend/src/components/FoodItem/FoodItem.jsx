// src/components/FoodItem.jsx
import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${url}/images/${image.split('/').pop()}`} // Adjust the image path
          alt={name}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(1, id)} // Assuming user ID is 1 for now
            src="/path/to/add_icon_white.png" // Update the path to your add icon
            alt="Add to Cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(1, id)} // Assuming user ID is 1 for now
              src="/path/to/remove_icon_red.png" // Update the path to your remove icon
              alt="Remove from Cart"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(1, id)} // Assuming user ID is 1 for now
              src="/path/to/add_icon_green.png" // Update the path to your add icon
              alt="Add to Cart"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src="/path/to/rating_starts.png" alt="Rating" /> {/* Update the path to your rating icon */}
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;