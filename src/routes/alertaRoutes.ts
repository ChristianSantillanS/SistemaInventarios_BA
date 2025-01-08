import { Router } from "express";
import {
  getAllAlertas,
  createAlerta,
  updateAlerta,
  deleteAlerta,
} from "../controllers/alertaController.js";


const router = Router();

router.get("/", getAllAlertas);
router.post("/", createAlerta);
router.put("/:id", updateAlerta);
router.delete("/:id", deleteAlerta);

export default router;
