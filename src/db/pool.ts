import { Pool } from "pg";
import { dbConfig } from "@/db/config.js";

const pool = new Pool(dbConfig);

export const query = (text: string, params?: unknown[]) =>
  pool.query(text, params);
