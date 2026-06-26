import express from "express";
import { createMenuItem, getAllMenue } from "../controller/menu.Controller.js";
import { protect } from "../middleware/protect.Middleware.js";

const route = express.Router();

route.post("/create-menue", protect, createMenuItem);
route.get("/all-menu", getAllMenue);

export default route;
