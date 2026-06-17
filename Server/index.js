import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";


dotenv.config();
connectDB()
const app = express();







app.get("/health", (req, res) => {
  res.send("Server running");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server running on port ${port}
link => http://localhost:3000`);
});
