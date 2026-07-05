import express from "express";
import {
  deleteUser,
  getALLUsers,
  getUserByEmail,
  getUserById,
  updatepass,
  updateUser,
  updateUserRole,
} from "../controller/user.Controller.js";
import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.middleware.js";

const route = express.Router();

route.get("/all-users", protect, adminOnly, getALLUsers);

route.get("/user/:id", getUserById);

route.get("/user-email", getUserByEmail);

route.delete("/delete-user/:id", protect, deleteUser);

route.put("/update-user/:id", protect, updateUser);

route.put("/update-user-role/:id", protect, adminOnly, updateUserRole);

route.put("/uodate-passowrd", protect, updatepass);
export default route;
