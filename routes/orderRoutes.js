import express from "express";
import Razorpay from "razorpay";
import Order from "../models/Order.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY,
  key_secret: process.env.RAZOR_SECRET,
});

// Create Razorpay Order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log(error);
  }
});

// Save Shipping + Payment Info
router.post("/save", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
});

export default router;