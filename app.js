import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import hotelsRoutes from "./routes/hotel.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta del directorio donde se encuentra el archivo actual
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Servir archivos estáticos desde la carpeta 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://cultura-nobsa.vercel.app",
    ],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", hotelsRoutes);

export default app;
