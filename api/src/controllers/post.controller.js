import { bot } from "../bot/bot.js";
import { pool } from "../config/db.js";
import schedule from "node-schedule";

// export const createPost = async (req, res) => {
//   const { title, content, images, scheduled_at } = req.body;
//   const result = await pool.query(
//     "INSERT INTO posts (title, content, images, scheduled_at) VALUES ($1, $2, $3, $4) RETURNING *",
//     [title, content, images, scheduled_at],
//   );
//   res.json(result.rows[0]);
// };

export const createPost = async (req, res) => {
  const { title, content, scheduled_at } = req.body;

  const result = await pool.query(
    "INSERT INTO posts (title, content, scheduled_at) VALUES ($1, $2, $3) RETURNING *",
    [title, content, scheduled_at],
  );
  const newPost = result.rows[0];

  const date = new Date(scheduled_at);
  schedule.scheduleJob(date, async () => {
    // 1. Bazadan barcha foydalanuvchilarni olamiz
    const users = await pool.query("SELECT chat_id FROM users");

    for (let user of users.rows) {
      try {
        const sentMsg = await bot.sendMessage(
          user.chat_id,
          `<b>${title}</b>\n\n${content}`,
          { parse_mode: "HTML" },
        );

        // 2. Har bir yuborilgan xabarni saqlaymiz (Update/Delete uchun)
        await pool.query(
          "INSERT INTO sent_messages (post_id, message_id, chat_id) VALUES ($1, $2, $3)",
          [newPost.id, sentMsg.message_id, user.chat_id],
        );
      } catch (err) {
        console.error(`User ${user.chat_id} ga xabar ketmadi:`, err.message);
      }
    }
  });

  res.json(newPost);
};

export const getPosts = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM posts ORDER BY created_at DESC",
  );
  res.json(result.rows);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  await pool.query("UPDATE posts SET title=$1, content=$2 WHERE id=$3", [
    title,
    content,
    id,
  ]);

  res.json({ success: true });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const messages = await pool.query(
    "SELECT * FROM sent_messages WHERE post_id = $1",
    [id],
  );

  await pool.query("DELETE FROM posts WHERE id = $1", [id]);
  res.json({ success: true });
};
