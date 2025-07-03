import { Pool } from "pg";

const dbConfig = {
  database: process.env.DB_NAME ?? "top_users",
  host: process.env.DB_HOST ?? "localhost",
  password: process.env.DB_PASSWORD ?? "",
  port: Number(process.env.DB_PORT ?? "5432"),
  user: process.env.DB_USER ?? "chenjian",
};

const pool = new Pool(dbConfig);

export const query = (text: string, params?: unknown[]) =>
  pool.query(text, params);
