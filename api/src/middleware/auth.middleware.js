import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const JWT_SECRET = ENV.JWT_SECRET || "";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, chatId: user.chat_id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token topilmadi" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token yaroqsiz yoki muddati o'tgan" });
    }
    req.user = decoded;
    next();
  });
};
