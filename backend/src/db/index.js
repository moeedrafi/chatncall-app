import mongoose from "mongoose";

const DB_NAME = "chatncall";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
