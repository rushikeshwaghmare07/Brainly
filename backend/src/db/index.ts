import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(
      `MongoDB connected! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection failed: ${error}`);
    process.exit(1);
  }
};
