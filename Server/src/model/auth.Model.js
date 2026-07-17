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
      // user or admin
      enum: ["user", "admin","employee"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("User", userSchema);
export default User;
