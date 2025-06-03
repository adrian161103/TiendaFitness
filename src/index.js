import express from "express";
import bodyParser from "body-parser";
import { PORT, MONGODB_URI } from "./config.js";
import {conectDB} from "./db.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import session from "express-session";
import cors from "cors";
import path from "path";
const app = express();

app.use(cors({
    origin: [
        "https://www.pedrolamanna.com",
         "http://localhost:5173"
        ],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
secret: "secret",
resave: false, 
saveUninitialized: false,
}
))

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
conectDB();



app.use("/api/user",userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)


if (!MONGODB_URI) {
  console.error("❌ ERROR: La variable MONGODB_URI no está definida");
  process.exit(1);
}

conectDB()
  .then(() => {
    console.log("✅ Base de datos conectada correctamente");
    // Sólo arrancamos el servidor después de conectar a la base:
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err);
    process.exit(1);
  });