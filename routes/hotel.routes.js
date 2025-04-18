import { Router } from "express";
import { authRequired } from "../middlewares/validatetoken.js";
import {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotels.controller.js";

const router = Router();

// RUTA PARA OBTENER LA INFORMACION DE TODOS LOS HOTELES
router.get("/hotels", getHotels);
// RUTA PARA OBTENER LA INFORMACION DE UN HOTEL
router.get("/hotels/:id", authRequired, getHotel);
// RUTA PARA AGREGAR UN HOTELES
router.post("/hotels", authRequired, createHotel);
// RUTA PARA ELIMINAR UN HOTEL
router.delete("/hotels/:id", authRequired, deleteHotel);
// RUTA PARA MODIFICAR LA INFORMACION DE UN HOTEL
router.put("/hotels/:id", authRequired, updateHotel);

export default router;
