import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const prisma = new PrismaClient();

async function clearDatabase() {
  console.log("Clearing existing data...");
  await prisma.alerta.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.proveedor.deleteMany();
  await prisma.usuario.deleteMany();
  console.log("Database cleared.");
}

async function loadData() {
  const dataDirectory = path.resolve(__dirname, "seedData");

  const usuarios = JSON.parse(
    fs.readFileSync(path.join(dataDirectory, "usuarios.json"), "utf-8")
  );
  const categorias = JSON.parse(
    fs.readFileSync(path.join(dataDirectory, "categorias.json"), "utf-8")
  );
  const proveedores = JSON.parse(
    fs.readFileSync(path.join(dataDirectory, "proveedores.json"), "utf-8")
  );
  const productos = JSON.parse(
    fs.readFileSync(path.join(dataDirectory, "productos.json"), "utf-8")
  );
  const alertas = JSON.parse(
    fs.readFileSync(path.join(dataDirectory, "alertas.json"), "utf-8")
  );

  console.log("Seeding Usuarios...");
  for (const usuario of usuarios) {
    await prisma.usuario.create({ data: usuario });
  }

  console.log("Seeding Categorias...");
  for (const categoria of categorias) {
    await prisma.categoria.create({ data: categoria });
  }

  console.log("Seeding Proveedores...");
  for (const proveedor of proveedores) {
    await prisma.proveedor.create({ data: proveedor });
  }

  console.log("Seeding Productos...");
  for (const producto of productos) {
    await prisma.producto.create({ data: producto });
  }

  console.log("Seeding Alertas...");
  for (const alerta of alertas) {
    await prisma.alerta.create({ data: alerta });
  }
}

async function main() {
  await clearDatabase();
  await loadData();
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
