import {Router} from "express"
import { createProduct, deleteProduct, findProductById, findProductByName, getProducts, getStatus, updateProduct } from "../controlers/productController.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";
import upload from "../middlewares/upload.js";

const productRoute = Router();


productRoute.get("/get", getProducts)
productRoute.post("/create",verifyTokenMiddleware,upload.single("image"), createProduct)

//endpoint para los status
productRoute.get("/status", getStatus)
productRoute.get("/get-by-id/:id",verifyTokenMiddleware, findProductById)
productRoute.post("/get-by-name",verifyTokenMiddleware, findProductByName)
productRoute.put("/update/:id",verifyTokenMiddleware, updateProduct)
productRoute.delete("/delete/:id",verifyTokenMiddleware, deleteProduct)

export default productRoute