import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/router/auth.Routes.js";
import bodyParser from "body-parser";
import usersRoutes from "./src/router/usersRoutes.js";
import categoryRoutes from "./src/router/category.Routes.js";
dotenv.config();
connectDB();
app.use(bodyParser.json());
const app = express();

app.get("/health", (req, res) => {
  res.send("Server running");
});

const port = process.env.PORT;
app.use("/api", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", categoryRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}
link => http://localhost:3000`);
});
