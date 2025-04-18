import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import hotelsRoutes from "./routes/hotel.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cors({ origin:[ "http://localhost:5173", "https://cultura-nobsa.vercel.app"], credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", hotelsRoutes);

export default app;
