import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  website: { type: String, required: false, trim: true },
  contact: { type: String, required: true, trim: true },
  image: { type: String },
});

export default mongoose.model("Hotels", hotelSchema);
