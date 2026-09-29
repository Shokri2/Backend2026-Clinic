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

import cors from "cors";

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Parse JSON
app.use(bodyParser.json());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["PUT", "POST", "GET", "DELETE"],
  }),
);

// Health check
app.get("/health", (req, res) => {
  res.send("Server running");
});

// Port
const port = process.env.PORT || 3000;

// Routes
app.use("/api", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", categoryRoutes);
app.use("/api", menuRoutes);
app.use("/api", service);
app.use("/api", doctorRoutes);
app.use("/api", bookingRoutes);
app.use("/api", appointmentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
