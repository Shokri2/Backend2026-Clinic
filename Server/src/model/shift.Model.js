import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    shiftNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    isOverTime: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["end", "not started", "in progress"],
      default: "not started",
    },
  },
  { timestamps: true },
);

const Shift = mongoose.model("Shfit", shiftSchema);
export default Shift;
