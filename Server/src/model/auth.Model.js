import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    hash_password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "doctor"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
