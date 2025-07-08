import { Client } from "pg";
import { dbConfig, initialize } from "../db/config.js";
import { getRandomColor } from "../utils/getNoteStyle.js";

const stmt = "INSERT INTO messages (username, text, color) VALUES ($1, $2, $3)";
const values = [
  ["Alex", "Welcome to the board! 🎉", getRandomColor()],
  ["Bob", "Glad you're here 😊", getRandomColor()],
  ["Charlie", "Make yourself at home 🏡", getRandomColor()],
  ["Mia", "Hey there! 👋", getRandomColor()],
  ["Ethan", "Nice to meet you! 🌟", getRandomColor()],
  ["Olivia", "Hope you’re having a great day ☀️", getRandomColor()],
];

async function populate() {
  await initialize();

  console.log("Seeding ...");

  const client = new Client(dbConfig);
  await client.connect();

  await client.query("DELETE FROM messages;");

  await Promise.all(values.map((value) => client.query(stmt, value)));

  await client.end();

  console.log("Seeding done!");
}

await populate();
