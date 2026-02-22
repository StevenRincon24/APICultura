import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  website: String,
  contact: { type: String, required: true },
  image: {
    url: String,
    public_id: String,
  },
});

export default mongoose.model("Hotels", hotelSchema);
