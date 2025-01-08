import { Router } from "express";
import productoRoutes from "./productoRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js";
import proveedorRoutes from "./proveedorRoutes.js";
import usuarioRoutes from "./usuarioRoutes.js";
import alertaRoutes from "./alertaRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import authRoutes from "./authRoutes.js";

const router = Router();

router.use("/productos", productoRoutes);
router.use("/categorias", categoriaRoutes);
router.use("/proveedores", proveedorRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/alertas", alertaRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/auth", authRoutes);

export default router;
