import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is conncted");
  } catch (error) {
    console.log("Error in connecting to database", error);
  }
};

export default connectDB;
