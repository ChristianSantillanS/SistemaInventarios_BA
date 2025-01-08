import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Obtener todas las alertas
export const getAllAlertas = async (req, res) => {
    try {
        const alertas = await prisma.alerta.findMany({
            include: { producto: true },
        });
        res.status(200).json(alertas);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener las alertas" });
    }
};
// Crear una nueva alerta
export const createAlerta = async (req, res) => {
    try {
        const { productoId, fecha, estado } = req.body;
        const nuevaAlerta = await prisma.alerta.create({
            data: { productoId, fecha: new Date(fecha), estado },
        });
        res.status(201).json(nuevaAlerta);
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear la alerta" });
    }
};
// Actualizar una alerta existente
export const updateAlerta = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const alertaActualizada = await prisma.alerta.update({
            where: { id: parseInt(id) },
            data: { estado },
        });
        res.status(200).json(alertaActualizada);
    }
    catch (error) {
        res.status(500).json({ error: "Error al actualizar la alerta" });
    }
};
// Eliminar una alerta
export const deleteAlerta = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.alerta.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: "Alerta eliminada correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al eliminar la alerta" });
    }
};
export const getAlertaById = async (req, res) => {
    const { id } = req.params;
    try {
        const alerta = await prisma.alerta.findUnique({
            where: { id: Number(id) },
            include: { producto: true },
        });
        if (!alerta) {
            return res.status(404).json({ error: "Alerta no encontrada" });
        }
        res.json(alerta);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener la alerta" });
    }
};
