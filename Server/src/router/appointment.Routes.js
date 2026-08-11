import express from "express";
import Appointment from "../model/appointment.Model.js";

const router = express.Router();

// ======================================================
// CREATE APPOINTMENT
// ======================================================

router.post("/appointments", async (req, res) => {
  try {
    const { user, service, doctor, date, time, status } = req.body;

    console.log("=================================");
    console.log("CREATE APPOINTMENT");
    console.log(req.body);
    console.log("=================================");

    // User is required
    if (!user) {
      return res.status(400).json({
        message: "User is required",
      });
    }

    // Date is required
    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    // Time is required
    if (!time) {
      return res.status(400).json({
        message: "Time is required",
      });
    }

    // Must have either service OR doctor
    if (!service && !doctor) {
      return res.status(400).json({
        message: "Service or doctor is required",
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      user,
      service: service || undefined,
      doctor: doctor || undefined,
      date,
      time,
      status: status || "Booked",
    });

    // Populate data
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("user")
      .populate("service")
      .populate("doctor");

    console.log("Appointment created:");
    console.log(populatedAppointment);

    res.status(201).json(populatedAppointment);
  } catch (error) {
    console.error("CREATE APPOINTMENT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// GET USER APPOINTMENTS
// ======================================================

router.get("/appointments/user/:userId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.params.userId,
    })
      .populate("user")
      .populate("service")
      .populate("doctor")
      .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (error) {
    console.error("GET USER APPOINTMENTS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// GET ALL APPOINTMENTS - ADMIN
// ======================================================

router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("user")
      .populate("service")
      .populate("doctor")
      .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (error) {
    console.error("GET ALL APPOINTMENTS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
