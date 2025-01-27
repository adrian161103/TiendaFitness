import { verifyToken } from "../utils/verifyToken.js";

export const verifyTokenMiddleware = async (req, res, next) => {
    try {
        const token= req.session.token
        if (!token) {
            return res.status(400).json({ message: "token de accseso no proporcionado" });
        }
      const decoded = verifyToken(token)
      console.log({decoded});
       req.user = decoded;
       next()
    } catch (error) {
        return res.status(400).json({ message: "token invalid", error });
   
    
}}