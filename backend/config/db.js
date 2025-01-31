import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://tomato:LhkBGI6PBtQnFMG8@cluster0.rcs3v.mongodb.net/Tomato"
    )
    .then(() => console.log("DB Connected"));
};
