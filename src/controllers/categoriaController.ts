import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCategorias = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: { productos: true },
    });
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

export const createCategoria = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nombre } = req.body;

    const nuevaCategoria = await prisma.categoria.create({
      data: { nombre },
    });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

export const updateCategoria = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const categoriaActualizada = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: { nombre },
    });
    res.status(200).json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

export const deleteCategoria = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.categoria.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

export const getCategoriaById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const categoria = await prisma.categoria.findUnique({
      where: { id: Number(id) },
      include: { productos: true },
    });

    if (!categoria) {
      res.status(404).json({ error: "Categoría no encontrada" });
      return;
    }

    res.json(categoria);
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};
