import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin:"https://allgrab.vercel.app", // 🔥 allow ALL origins safely
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// preflight support

app.use(express.json());
// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
// Routes
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
