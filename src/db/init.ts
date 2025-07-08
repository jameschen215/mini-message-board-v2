import { Client, ClientConfig } from "pg";
import "dotenv/config";

export const dbConfig: ClientConfig =
  process.env.NODE_ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        database: process.env.DB_NAME ?? "top_users",
        host: process.env.DB_HOST ?? "localhost",
        user: process.env.DB_USER ?? "chenjian",
        password: process.env.DB_PASSWORD ?? "",
        port: Number(process.env.DB_PORT ?? 5432),
      };

export async function initializeDatabase() {
  const client = new Client(dbConfig);
  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR(20) NOT NULL,
      text VARCHAR(255) NOT NULL,
      color VARCHAR(20) NOT NULL,
      created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await client.end();
}
