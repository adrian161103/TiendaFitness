import jtw from "jsonwebtoken";

export  function verifyToken(token) {
    try {

      const decoded =  jtw.verify(token, "secret");

      return decoded;
    } catch (error) {
        
        throw new Error("Invalid token");
    }
}