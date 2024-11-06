import mongoose, { Mongoose } from "mongoose";

// Connect to MongoDB
const ConnectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log(`MongoDB Connected`);
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/spotify`);
};

export default ConnectDB;
