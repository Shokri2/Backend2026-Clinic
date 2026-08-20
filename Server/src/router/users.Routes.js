import express from "express";

import {
  deleteUser,
  getALLUsers,
  getAllDoctors,
  getUserById,
  updateUser,
  updateUserRole,
} from "../controller/user.Controller.js";

import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.middleware.js";

const route = express.Router();

route.get("/all-users", protect, adminOnly, getALLUsers);

route.get("/all-doctors", protect, adminOnly, getAllDoctors);

route.delete("/delete-user/:id", protect, adminOnly, deleteUser);

route.put("/update-user/:id", protect, adminOnly, updateUser);

route.put("/update-user-role/:id", protect, adminOnly, updateUserRole);

route.get("/user/:id", getUserById);

export default route;
