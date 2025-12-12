import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
dotenv.config();
import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
  }),
);
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