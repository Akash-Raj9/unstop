import mongoose from "mongoose";

const connectDB = async (MONGO_URI) => {
  try {
    const connectionDB = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED ");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
