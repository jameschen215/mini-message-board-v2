// src/db/config.ts

import { Client } from "pg";

export const dbConfig = {
  database: process.env.DB_NAME ?? "top_users",
  host: process.env.DB_HOST ?? "localhost",
  password: process.env.DB_PASSWORD ?? "",
  port: Number(process.env.DB_PORT ?? "5432"),
  user: process.env.DB_USER ?? "chenjian",
};

const stmt = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(20) NOT NULL,
    text VARCHAR(255) NOT NULL,
    color VARCHAR(20) NOT NULL,
    created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );
`;

export async function initialize() {
  console.log("Initializing database ...");

  const client = new Client(dbConfig);
  await client.connect();
  await client.query(stmt);
  await client.end();

  console.log("Initialization done!");
}
