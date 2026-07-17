//route => express

import express from "express";
import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.Middleware.js";
import {
  createShift,
  getAllShfits,
  getAllShfitsForEmployee,
  updateShiftStatus,
} from "../controller/shift.Controller.js";
import { employeeOnly } from "../middleware/EmployeeOnly.Middleware.js";
import { checkRole } from "../middleware/checkRole.Middleware.js";
const route = express.Router();

route.post("/create-shift", protect, adminOnly, createShift);
route.get("/all-shifts", protect, adminOnly, getAllShfits);
route.get(
  "/employee-shift/:id",
  protect,
  checkRole("admin", "employee"),
  getAllShfitsForEmployee,
);
route.put("/update-shift/:id", protect, employeeOnly, updateShiftStatus);
export default route;
