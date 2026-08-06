import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  department: String,
  experience: Number,
  image: String,
  about: String,
});

export default mongoose.model("Doctor", doctorSchema);
