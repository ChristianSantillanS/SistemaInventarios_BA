import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Obtener todos los proveedores
export const getAllProveedores = async (req, res) => {
    try {
        const proveedores = await prisma.proveedor.findMany({
            include: { productos: true },
        });
        res.status(200).json(proveedores);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los proveedores" });
    }
};
// Crear un nuevo proveedor
export const createProveedor = async (req, res) => {
    try {
        const { nombre, contacto } = req.body;
        const nuevoProveedor = await prisma.proveedor.create({
            data: { nombre, contacto },
        });
        res.status(201).json(nuevoProveedor);
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear el proveedor" });
    }
};
// Actualizar un proveedor existente
export const updateProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const proveedorActualizado = await prisma.proveedor.update({
            where: { id: parseInt(id) },
            data,
        });
        res.status(200).json(proveedorActualizado);
    }
    catch (error) {
        res.status(500).json({ error: "Error al actualizar el proveedor" });
    }
};
// Eliminar un proveedor
export const deleteProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.proveedor.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: "Proveedor eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al eliminar el proveedor" });
    }
};
export const getProveedorById = async (req, res) => {
    const { id } = req.params;
    try {
        const proveedor = await prisma.proveedor.findUnique({
            where: { id: Number(id) },
            include: { productos: true },
        });
        if (!proveedor) {
            res.status(404).json({ error: "Proveedor no encontrado" });
            return;
        }
        res.json(proveedor);
    }
    catch (error) {
        console.error("Error al obtener el proveedor:", error);
        res.status(500).json({ error: "Error al obtener el proveedor" });
    }
};
