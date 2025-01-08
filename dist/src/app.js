import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use(cors());
app.use(bodyParser.json());
// Rutas principales
app.use("/api", routes);
// Ruta base
app.get("/", (_, res) => {
    res.send("API funcionando correctamente");
});
// Inicializar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
