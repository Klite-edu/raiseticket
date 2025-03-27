import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.resolve(__dirname, "./.env") });

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import ticketRoutes from "./routes/ticketRoutes.js";

// Debugging - Check if .env is loaded correctly
console.log("🛠 DEBUG: MONGO_URI =", process.env.MONGO_URI);

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});