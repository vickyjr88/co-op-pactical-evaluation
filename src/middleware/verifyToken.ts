import { Request, Response } from "express";
import jwt from "jsonwebtoken";
// Middleware to verify JWT
const verifyToken = (req: Request, res: Response, next: any) => {
  const SECRET_KEY: string = process.env.SECRET_KEY || "Secret key.";
  const bearerToken = req.headers["authorization"];
  const token = bearerToken && bearerToken.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Token is required" });
  }

  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.body.userId = decoded.userId;
    next();
  });
};

export default verifyToken;
