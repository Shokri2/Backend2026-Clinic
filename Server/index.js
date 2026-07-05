import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/router/auth.Routes.js";
import bodyParser from "body-parser";
import usersRoutes from "./src/router/users.Routes.js";
import categoryRoutes from "./src/router/category.Routes.js";
import cors from "cors"
dotenv.config();
connectDB();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    // front link
    credentials:true,
    methods:['PUT','POST','GET','DELETE']
  }),
);
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
