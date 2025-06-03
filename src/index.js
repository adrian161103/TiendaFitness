import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./config.js";
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


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 
