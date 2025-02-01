import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
<<<<<<< HEAD
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
=======
import orderRouter from "./routes/orderRoute.js";

>>>>>>> fc9eaecdc63d16ad04d47486617600cc4c91e0c7
//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
<<<<<<< HEAD
app.use("/api/user", userRouter);
=======
app.use("/api/order", orderRouter);
>>>>>>> fc9eaecdc63d16ad04d47486617600cc4c91e0c7

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
