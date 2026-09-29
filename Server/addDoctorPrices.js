import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "./src/model/doctor.Model.js";

dotenv.config();

const addDoctorPrices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const doctors = await Doctor.find({
      price: { $exists: false },
    }).select("_id name");

    console.log(`Found ${doctors.length} doctors without prices`);

    for (const doctor of doctors) {
      const price = Math.floor(Math.random() * 31) + 20;

      await Doctor.updateOne({ _id: doctor._id }, { $set: { price: price } });

      console.log(`${doctor.name} -> $${price}`);
    }

    console.log("All doctor prices added successfully");

    await mongoose.disconnect();

    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("ERROR:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

addDoctorPrices();
