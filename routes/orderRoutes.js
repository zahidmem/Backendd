import express from "express";
import Razorpay from "razorpay";
import Order from "../models/Order.js";

const router = express.Router();

// ⬇️ Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// =======================================
// 1️⃣ CREATE ORDER FOR RAZORPAY PAYMENT
// =======================================
router.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("REQ BODY → ", req.body);

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // Convert to paisa
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// =======================================
// 2️⃣ SAVE ORDER IN DATABASE
// =======================================
router.post("/save", async (req, res) => {
  try {
    const { address, amount, paymentId, orderId } = req.body;

    const newOrder = await Order.create({
      ...address,
      amount,
      paymentId,
      orderId,
    });

    res.json({ message: "Order saved successfully", newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to save order" });
  }
});

export default router;
