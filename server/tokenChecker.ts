import jwt from "jsonwebtoken";
import config from "./config.json";
import { RequestHandler } from "express";

const tokenChecker: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split("Bearer ")[1];
  
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err: any, decoded: string) => {
      if (err) {
        return res.status(401).json({ expired: true, message: "Token expired" });
      }

      (req as any).user = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      error: true,
      message: "No token provided."
    });
  }
};

export default tokenChecker;
