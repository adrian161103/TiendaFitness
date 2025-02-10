import { verifyToken } from "../utils/verifyToken.js";

export const verifyTokenMiddleware = async (req, res, next) => {
    try {
   
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(400).json({ message: "access token not provided" });
        }

        const token = authHeader.split(" ")[1]

      const decoded = verifyToken(token)
      console.log({decoded});
       req.user = decoded;
       next()
    } catch (error) {
        return res.status(400).json({ message: "token invalid", error });
   
    
}}