import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./config.js";
import {conectDB} from "./db.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express();



app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
secret: "secret",
resave: false, 
saveUninitialized: false,
}
))

conectDB();



app.use("/api/user",userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)


app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
}); 
