import express from "express";
import { ENV } from "./src/config/env.js";
import { pool } from "./src/config/db.js";
import { initBot } from "./src/bot/bot.js";
import router from "./src/routes/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://soatly.uz",
    credentials: true,
  }),
);

app.use("/api", router);

app.get("/health", (req, res) => {
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
