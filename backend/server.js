import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/userRoutes.js";
import apiRoutes from "./routes/api.js"; // ✅ Match ES module syntax

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // ✅ Keep only ONE json parser

app.use("/api/auth", authRoutes); // ✅ Handles authentication
app.use("/api", apiRoutes); // ✅ General API routes

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`✅ MongoDB Connected ${mongoose.connection.name}.`);
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

app.options("*", cors());

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));