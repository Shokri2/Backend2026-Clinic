import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/router/auth.Routes.js";
import bodyParser from "body-parser";
import usersRoutes from "./src/router/users.Routes.js";
import categoryRoutes from "./src/router/category.Routes.js";
import menuRoutes from "./src/router/menue.Routes.js";
import service from "./src/router/service.Routes.js";
import doctorRoutes from "./src/router/doctors.Routes.js";
import bookingRoutes from "./src/router/booking.Routes.js";
import appointmentRoutes from "./src/router/appointment.Routes.js";

import path from "path";
import cors from "cors";
dotenv.config();
const app = express();
connectDB();
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    // front link
    credentials: true,
    methods: ["PUT", "POST", "GET", "DELETE"],
  }),
);

app.get("/health", (req, res) => {
  res.send("Server running");
});

const port = process.env.PORT;
app.use("/api", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", categoryRoutes);
app.use("/api", menuRoutes);
app.use("/api", service);
app.use("/api", doctorRoutes);
app.use("/api", bookingRoutes);
app.use("/api", appointmentRoutes);
app.listen(port, () => {
  console.log(`server running on port ${port}
link => http://localhost:3000`);
});
