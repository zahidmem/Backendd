import express from "express";
import Address from "../models/addressModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const saved = await newAddress.save();

    res.json({
      success: true,
      message: "Address saved",
      data: saved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving address" });
  }
});

export default router;
