import express from "express";
import { createUser, deleteUser,  getUser, updatedUser, validate } from "../controlers/userController.js";
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";


const userRoute = express.Router();


userRoute.post("/create", createUser);
userRoute.get("/get",verifyTokenMiddleware, getUser);

userRoute.delete("/delete/:id", verifyTokenMiddleware, deleteUser)
userRoute.put("/update/:id",verifyTokenMiddleware, updatedUser)
userRoute.post("/login", validate)
export default userRoute;