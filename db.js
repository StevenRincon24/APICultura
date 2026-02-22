import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("Estado conexión:", mongoose.connection.readyState);

  mongoose.connection.on("error", err => {
    console.log("ERROR REAL DE MONGO:", err);
  });
};