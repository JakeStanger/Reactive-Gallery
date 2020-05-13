import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

const tokenChecker: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split("Bearer ")[1];
  
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.SESSION_SECRET, (err: any, decoded: string) => {
      if (err) {
        return res.status(401).json({ expired: true, msg: "Token expired" });
      }

      (req as any).user = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      error: true,
      msg: "No token provided."
    });
  }
};

export default tokenChecker;
