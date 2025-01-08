import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Obtener todos los productos
export const getAllProductos = async (req, res) => {
    try {
        const productos = await prisma.producto.findMany({
            include: { categoria: true, proveedor: true, alertas: true },
        });
        res.status(200).json(productos);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};
// Crear un nuevo producto y generar alerta si cantidad < minStock
export const createProducto = async (req, res) => {
    try {
        const { nombre, codigo, categoriaId, proveedorId, precio, cantidad, minStock, } = req.body;
        const nuevoProducto = await prisma.producto.create({
            data: {
                nombre,
                codigo,
                categoriaId,
                proveedorId,
                precio,
                cantidad,
                minStock,
            },
        });
        // Generar alerta si cantidad < minStock
        if (cantidad < minStock) {
            await prisma.alerta.create({
                data: {
                    productoId: nuevoProducto.id,
                    estado: "pendiente",
                },
            });
        }
        res.status(201).json(nuevoProducto);
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
};
// Actualizar un producto y verificar alertas
export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad, minStock, ...data } = req.body;
        const productoActualizado = await prisma.producto.update({
            where: { id: parseInt(id) },
            data: { ...data, cantidad, minStock },
        });
        // Verificar si cantidad < minStock y crear o mantener alerta
        if (cantidad < minStock) {
            const alertaExistente = await prisma.alerta.findFirst({
                where: { productoId: productoActualizado.id, estado: "pendiente" },
            });
            if (!alertaExistente) {
                await prisma.alerta.create({
                    data: {
                        productoId: productoActualizado.id,
                        estado: "pendiente",
                    },
                });
            }
        }
        else {
            // Si la cantidad cumple el stock mínimo, eliminar alerta
            await prisma.alerta.deleteMany({
                where: { productoId: productoActualizado.id, estado: "pendiente" },
            });
        }
        res.status(200).json(productoActualizado);
    }
    catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};
// Eliminar un producto y sus alertas asociadas
export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        // Eliminar alertas asociadas al producto
        await prisma.alerta.deleteMany({
            where: { productoId: parseInt(id) },
        });
        await prisma.producto.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: "Producto eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};
// Obtener un producto por ID
export const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await prisma.producto.findUnique({
            where: { id: Number(id) },
            include: { categoria: true, proveedor: true, alertas: true },
        });
        if (!producto) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }
        res.json(producto);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};
