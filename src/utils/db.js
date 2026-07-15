import mongoose from "mongoose";

const url = process.env.MongoDB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(`${url}/SpotifyDB`);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error : ", error);
  }
};

export default connectDB;
