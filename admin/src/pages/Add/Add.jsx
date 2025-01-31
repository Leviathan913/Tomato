import {React,useEffect,useState} from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
  const [image, setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    category:"Salad",
    price:""
  })

  const onChangeHandler = (event) => {
    const name= event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onsSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name',data.name);
    formData.append('description',data.description);
    formData.append('category',data.category);
    formData.append('price',Number(data.price));
    formData.append('image',image);
    const respone = await axios.post('${url}/api/food/add',formData);
    if(reponse.data.success){
      setData({
        name:"",
        description:"",
        category:"Salad",
        price:""
      })
      setImage(false);
      toast.success('response.data.message');
    }
    else{
      toast.error('response.data.message');
    }
  }

  return (
    <div className="add">
      <form className="flex-xol" onSubmit={onsSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p><br />Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>
        <div className="add-product-description flex-col">
          <p><br />Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write description of product here" required></textarea>
        </div>
        <div className="add-category flex-col">
          <p><br />Product Category</p>
          <select onChange={onChangeHandler}  name="category">
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Desserts">Desserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>
        <div className="add-price flex-col">
          <p><br />Product Price</p>
          <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="250 birr" required />
        </div><br />
        <button className='add-btn' type="submit">ADD</button>
      </form>
    </div>
  )
}

export default Add