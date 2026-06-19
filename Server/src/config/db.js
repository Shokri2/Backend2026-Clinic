import Mongoose from "mongoose";



export const connectDB = async () => {
  try {
    await Mongoose.connect(process.env.MONGO_URI);
    console.log('mongo connected');

  } catch (error) {
    console.error("not connected", error);
    process.exit(1);
  }
};
