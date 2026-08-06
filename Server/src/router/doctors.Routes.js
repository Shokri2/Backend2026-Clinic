import express from "express";
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controller/doctor.Controller.js";

const route = express.Router();

route.get("/doctors", getDoctors);
route.get("/doctors/:id", getDoctorById);
route.post("/doctors", createDoctor);
route.put("/doctors/:id", updateDoctor);
route.delete("/doctors/:id", deleteDoctor);

export default route;
