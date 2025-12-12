import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  pincode: String,
  address: String,
  city: String,
  state: String,
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
