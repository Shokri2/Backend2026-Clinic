import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
    },

    about: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Doctor", doctorSchema);
