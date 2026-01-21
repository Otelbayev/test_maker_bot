import type { Request, Response } from "express";
import type { UserRole, IUser } from "../types/user";
import { pool } from "../config/db";

class UserController {
  static async login(req: Request, res: Response) {
    try {
      const {
        chatId,
        firstName,
        lastName,
        username,
        role,
      }: {
        chatId: number;
        firstName?: string;
        lastName?: string;
        username?: string;
        role: UserRole;
      } = req.body;

      if (role !== "student" && role !== "teacher") {
        return res.status(400).json({
          message: "Role faqat student yoki teacher bo‘lishi mumkin",
        });
      }

      const existingUser = await pool.query<IUser>(
        "SELECT * FROM users WHERE chat_id = $1",
        [chatId],
      );

      if (existingUser.rows.length > 0) {
        return res.status(200).json({
          message: "User bazada mavjud",
          user: existingUser.rows[0],
        });
      }

      const newUser = await pool.query<IUser>(
        `
        INSERT INTO users (chat_id, first_name, last_name, username, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [chatId, firstName ?? null, lastName ?? null, username ?? null, role],
      );

      return res.status(201).json({
        message: "User yaratildi",
        user: newUser.rows[0],
      });
    } catch (error) {
      console.error("User login error:", error);
      return res.status(500).json({
        message: "Server xatosi",
      });
    }
  }
}

export default UserController;
