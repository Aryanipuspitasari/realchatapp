import "dotenv/config";
import jwt from "jsonwebtoken";

// Secret key for signing JWTs
const secretKey = process.env.SECRET_ACCESS_TOKEN;

export const authenticate = (req, res, next) => {
    const token = req.cookies.token;
     if(!token){
     return res.status(402).send("Access denied. Unauthenticated");
    }

    jwt.verify(token, secretKey, (error, decoded) =>{
        if (error) return res.status(401).send("INVALID TOKEN.");

         // If token is valid, attach the decoded user information to the request object
        req.user = decoded;
    
        next();
    })
}