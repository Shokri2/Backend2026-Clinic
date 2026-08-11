import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    // ================= USER =================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ================= SERVICE =================
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: false,
    },

    // ================= DOCTOR =================
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: false,
    },

    // ================= DATE =================
    date: {
      type: String,
      required: true,
    },

    // ================= TIME =================
    time: {
      type: String,
      required: true,
    },

    // ================= STATUS =================
    status: {
      type: String,
      default: "Booked",
    },
  },
  {
    timestamps: true,
  },
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
