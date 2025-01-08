import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "clave_secreta";
export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};
export const createUsuario = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await prisma.usuario.create({
            data: { nombre, email, password: hashedPassword, rol },
        });
        res.status(201).json(nuevoUsuario);
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};
export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password, rol } = req.body;
        const data = { nombre, email, rol };
        if (password) {
            data.password = await bcrypt.hash(password, 10);
        }
        const usuarioActualizado = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data,
        });
        res.status(200).json(usuarioActualizado);
    }
    catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};
export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.usuario.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};
export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: Number(id) },
        });
        if (!usuario) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        res.json(usuario);
    }
    catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await prisma.usuario.findUnique({
            where: { email },
        });
        if (!usuario) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Contraseña incorrecta" });
            return;
        }
        const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }, SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
        });
    }
    catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};
