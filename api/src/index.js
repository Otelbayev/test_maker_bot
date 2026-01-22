import express from "express";
import { ENV } from "./config/env.js";
import { pool } from "./config/db.js";
import { initBot } from "./bot/bot.js";
import router from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api", router);

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
