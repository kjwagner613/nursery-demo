import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // ✅ Import database connection
import authRoutes from "./routes/userRoutes.js";
import apiRoutes from "./routes/api.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB before starting the server
connectDB();

app.use(cors());
app.use(express.json()); // ✅ Keep only ONE json parser

app.use("/api/auth", authRoutes); // ✅ Handles authentication
app.use("/api", apiRoutes); // ✅ General API routes

app.options("*", cors());

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));