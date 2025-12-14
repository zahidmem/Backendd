import express from "express";
import razorpay from "../config/razorpay.js";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

router.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_order_" + Math.random(),
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order creation failed" });
  }
});

export default router;
