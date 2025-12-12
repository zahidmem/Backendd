import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  pincode: String,
  state: String,
  city: String,
  addressLine: String,

  amount: Number,
  paymentId: String,
  orderId: String,
  status: {
    type: String,
    default: "Paid",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
