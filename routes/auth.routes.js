import { Router } from "express";
import {
  login,
  logout,
  registro,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/registro", registro);

router.post("/login", login);

router.post("/logout", logout);

// RUTAS PARA CUANDO ESTA LOGUEADO
router.get("/profile", authRequired, profile);

router.get("/validate-token", verifyToken);

export default router;
