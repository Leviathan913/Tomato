import orderModel from "../models/orderModel";
import userModel from "../models/userModel";


//placing user order form frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174"; 

    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        res.json({success:true,session_url:`${frontend_url}/success=true&orderId=${newOrder._id}`})
    }catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder = async (req,res) =>{
    const {orderId,success} = req.body;
    try{
        if (success=="true") {
            await orderModel.findByIdAndUpdate(orderId,{paymnet:true})
            res.json({success:true,message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"not paid"})
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//user orders for frontend
const userOrders = async (req,res) =>{
    try{
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { placeOrder,verifyOrder,userOrders }