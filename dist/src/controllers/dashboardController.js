import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getDashboardMetrics = async (_, res) => {
    try {
        const totalProductos = await prisma.producto.count();
        const totalCategorias = await prisma.categoria.count();
        const totalProveedores = await prisma.proveedor.count();
        const totalUsuarios = await prisma.usuario.count();
        const totalAlertasPendientes = await prisma.alerta.count({
            where: { estado: "pendiente" },
        });
        res.status(200).json({
            totalProductos,
            totalCategorias,
            totalProveedores,
            totalUsuarios,
            totalAlertasPendientes,
        });
    }
    catch (error) {
        console.error("Error al obtener métricas del Dashboard:", error);
        res.status(500).json({ error: "Error al obtener métricas del Dashboard" });
    }
};
