import express from "express";

import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorAppointments,
} from "../controller/doctor.Controller.js";

import { protect } from "../middleware/protect.Middleware.js";
import { doctorOnly } from "../middleware/doctorOnly.middleware.js";

const route = express.Router();

route.get("/doctors", getDoctors);

route.get("/doctors/appointments", protect, doctorOnly, getDoctorAppointments);

route.get("/doctors/:id", getDoctorById);

route.post("/doctors", createDoctor);

route.put("/doctors/:id", updateDoctor);

route.delete("/doctors/:id", deleteDoctor);

export default route;
