import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes/index.js";

// Cargar configuraciones de variables de entorno
dotenv.config();

// Crear instancia de la aplicación
const app: Application = express();
const PORT = process.env.PORT || 3000;

/* Middlewares */
app.use(cors());
app.use(bodyParser.json());

/* Rutas principales */
app.use("/api", routes);

// Ruta raíz
app.get("/", (_, res) => {
  res.json({
    mensaje: "Bienvenido a la API REST",
    version: "1.0.0",
    rutas: [
      {
        endpoint: "/api/productos",
        metodo: "GET",
        descripcion: "Obtener lista de productos",
      },
      {
        endpoint: "/api/categorias",
        metodo: "GET",
        descripcion: "Obtener lista de categorías",
      },
      {
        endpoint: "/api/proveedores",
        metodo: "GET",
        descripcion: "Obtener lista de proveedores",
      },
      {
        endpoint: "/api/usuarios",
        metodo: "GET",
        descripcion: "Obtener lista de usuarios",
      },
      {
        endpoint: "/api/alertas",
        metodo: "GET",
        descripcion: "Obtener lista de alertas",
      },
      {
        endpoint: "/api/dashboard",
        metodo: "GET",
        descripcion: "Obtener métricas del dashboard",
      },
      {
        endpoint: "/api/auth",
        metodo: "POST",
        descripcion: "Autenticación de usuarios",
      },
    ],
  });
});

/* Inicializar servidor */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
