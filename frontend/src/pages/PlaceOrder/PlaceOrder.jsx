import React, { useContext, useEffect , useState} from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import Title from "../../components/Title/Title.jsx";

const PlaceOrder = () => {
  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
  }

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const navigate = useNavigate();

  useEffect(() => {
if (!token) {
  navigate("/cart");
    }
    else if (getTotalCartAmount() === 0) 
    {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form className="place-order">
      <div className="place-order-left">
        <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        <div className="multi-fields">
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="text" placeholder="Email address" />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input name="state" onChange={onChangeHandler} vaue={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input name="zipcode" onChange={onChangeHandler} value={data.zipCode} type="text" placeholder="Zip Code" />
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
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
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
