// db/init.ts

import { Client, ClientConfig } from "pg";

// Add logging to see what's happening
console.log("Environment check in db/init.ts:", {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL ? "EXISTS" : "MISSING",
  DATABASE_URL_length: process.env.DATABASE_URL?.length,
});

export const dbConfig: ClientConfig = process.env.DATABASE_URL
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

// Update your db/init.ts
export async function initializeDatabase() {
  const client = new Client(dbConfig);
  try {
    console.log("Database config:", {
      host: dbConfig.host ?? "from connectionString",
      database: dbConfig.database ?? "from connectionString",
      ssl: dbConfig.ssl ? "enabled" : "disabled",
    });

    console.log("Connecting to database...");
    await client.connect();
    console.log("Connected successfully");

    console.log("Creating table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(20) NOT NULL,
        text VARCHAR(255) NOT NULL,
        color VARCHAR(20) NOT NULL,
        created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table created successfully");
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string; detail?: string };
    console.error("Database initialization error details:", {
      message: err.message,
      code: err.code,
      detail: err.detail,
    });
    throw error;
  } finally {
    await client.end();
  }
}
