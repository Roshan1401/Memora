import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

const DB_NAME = process.env.DB_NAME || "memora";

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDB;