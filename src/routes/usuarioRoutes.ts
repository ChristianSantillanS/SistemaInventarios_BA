import { Router } from "express";
import {
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarioById,
} from "../controllers/usuarioController.js";

const router = Router();

router.get("/", getAllUsuarios);
router.post("/", createUsuario);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);
router.get("/:id", getUsuarioById);

export default router;
