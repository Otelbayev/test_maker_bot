import express from "express";
import { ENV } from "./config/env";
import { pool } from "./config/db";
import { initBot } from "./bot/bot";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Server is running" });
});

const startServer = async () => {
  try {
    await pool.connect();
    console.log("✅ PostgreSQL bazaga ulanish muvaffaqiyatli");
    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server is running on port ${ENV.PORT}`);
    });
    initBot();
  } catch (err) {
    console.error("❌ Serverni ishga tushirishda xatolik:", err);
    process.exit(1);
  }
};

startServer();
