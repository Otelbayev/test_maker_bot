import { pool } from "../config/db.js";
import { generateToken } from "../middleware/auth.middleware.js";

class UserController {
  static async login(req, res) {
    try {
      const { chatId, firstName, lastName, username, role } = req.body;

      if (!chatId || !role) {
        return res.status(400).json({ message: "chatId va role majburiy" });
      }

      const result = await pool.query(
        `
        INSERT INTO users (chat_id, first_name, last_name, username, role)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (chat_id)
        DO UPDATE SET
          role       = EXCLUDED.role,
          updated_at = NOW()
        RETURNING *
        `,
        [chatId, firstName ?? null, lastName ?? null, username ?? null, role],
      );

      const user = result.rows[0];
      const token = generateToken(user);

      return res.status(200).json({
        message: "Login muvaffaqiyatli",
        token,
        user: {
          chatId: user.chat_id,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
        },
      });
    } catch (error) {
      console.error("User login error:", error);
      return res.status(500).json({ message: "Server xatosi" });
    }
  }

  static async update(req, res) {
    try {
      const { chatId, firstName, lastName, username, role } = req.body;

      if (!chatId || !role) {
        return res.status(400).json({ message: "chatId va role majburiy" });
      }

      const result = await pool.query(
        `
        INSERT INTO users (chat_id, first_name, last_name, username, role)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (chat_id)
        DO UPDATE SET
          first_name = EXCLUDED.first_name,
          last_name  = EXCLUDED.last_name,
          username   = EXCLUDED.username,
          role       = EXCLUDED.role,
          updated_at = NOW()
        RETURNING *
        `,
        [chatId, firstName ?? null, lastName ?? null, username ?? null, role],
      );

      const user = result.rows[0];

      return res.status(200).json({
        message: "User yangilandi",
        user: {
          chatId: user.chat_id,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
        },
      });
    } catch (error) {
      console.error("User login error:", error);
      return res.status(500).json({ message: "Server xatosi" });
    }
  }

  static async getMe(req, res) {
    try {
      const { chatId } = req.user; // token ichidan

      const result = await pool.query(
        `
      SELECT chat_id, role, first_name, last_name, username
      FROM users
      WHERE chat_id = $1
      `,
        [chatId],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User topilmadi" });
      }

      const user = result.rows[0];

      return res.status(200).json({
        user: {
          chatId: Number(user.chat_id),
          role: user.role,
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          username: user.username || "",
        },
      });
    } catch (error) {
      console.error("getMe error:", error);
      return res.status(500).json({ message: "Server xatosi" });
    }
  }
}

export default UserController;
