import express from "express";
import Booking from "../model/booking.Model.js";

const router = express.Router();

/*
========================================
Create Booking
========================================
*/
router.post("/bookings", async (req, res) => {
  try {
    const { user, service, date, time, price } = req.body;

    if (!user || !service || !date || !time || price === undefined) {
      return res.status(400).json({
        message: "Please provide all booking information",
      });
    }

    const booking = await Booking.create({
      user,
      service,
      date,
      time,
      price,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("user", "name email")
      .populate("service", "title description price image");

    res.status(201).json({
      message: "Appointment booked successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
========================================
Get User Bookings
========================================
*/
router.get("/bookings/my-bookings/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.params.userId,
    })
      .populate("service", "title description price image")
      .populate("user", "name email")
      .sort({ date: 1, time: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
========================================
Get All Bookings - Admin
========================================
*/
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("service", "title description price image")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
========================================
Update Booking Status
========================================
*/
router.put("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("user", "name email")
      .populate("service", "title price");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
========================================
Delete Booking
========================================
*/
router.delete("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
