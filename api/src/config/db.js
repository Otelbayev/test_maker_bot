import { Pool } from "pg";
import { ENV } from "./env.js";

export const pool = new Pool({
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected (pool)");
});

pool.on("error", (err) => {
  console.error("❌ Pool error:", err);
});
