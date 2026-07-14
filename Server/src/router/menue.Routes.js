import express from "express";
import {
  createMenuItem,
  deleteMenuById,
  getMenuItemById,
  updateMenuInfo,
  updateMenuItemStatus,
  getAllMenu,
} from "../controller/menu.Controller.js";
import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.Middleware.js";
const route = express.Router();

route.post("/create-menue", protect, createMenuItem);
route.get("/all-menu",protect, getAllMenu);
route.get("/menu-item/:id", getMenuItemById);
route.put("/update-menu/:id", protect, adminOnly, updateMenuInfo);
route.delete("/delete-menu/:id", protect, adminOnly, deleteMenuById);
route.put("/update-status/:id", protect, adminOnly, updateMenuItemStatus);
export default route;
