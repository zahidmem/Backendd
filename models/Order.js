import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  address: String,
  city: String,
  pincode: String,
  paymentId: String,
  orderId: String,
  amount: Number,
});

export default mongoose.model("Order", orderSchema);