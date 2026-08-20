import express from "express";

import {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
  getAppointmentById,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controller/appointment.Controller.js";

import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.middleware.js";

const router = express.Router();

// =====================================================
// CREATE APPOINTMENT
// =====================================================

router.post("/appointments", protect, createAppointment);

// =====================================================
// GET USER APPOINTMENTS
// =====================================================

router.get("/appointments/user/:userId", protect, getUserAppointments);

// =====================================================
// GET ALL APPOINTMENTS
// ADMIN
// =====================================================

router.get("/appointments", protect, adminOnly, getAllAppointments);

// =====================================================
// GET APPOINTMENT BY ID
// =====================================================

router.get("/appointments/:id", protect, getAppointmentById);

// =====================================================
// UPDATE APPOINTMENT
// ADMIN
// =====================================================

router.put("/appointments/:id", protect, adminOnly, updateAppointment);

// =====================================================
// UPDATE APPOINTMENT STATUS
// ADMIN
// =====================================================

router.put(
  "/appointments/:id/status",
  protect,
  adminOnly,
  updateAppointmentStatus,
);

// =====================================================
// DELETE APPOINTMENT
// ADMIN
// =====================================================

router.delete("/appointments/:id", protect, adminOnly, deleteAppointment);

export default router;
