import { Client } from "pg";
import { dbConfig } from "@/config/db-config";

const txt = 'INSERT INTO messages (username, text) VALUES ($1, $2)';
const values = [
  ['Alex', 'Hello, world!'],
  ['Bob', 'Hello, Guys!'],
  ['Charlie', 'Hey, there!'],
]

async function populate() {
  console.log('Seeding ...');

  const client = new Client(dbConfig);
  await client.connect()

  await Promise.all(values.map((value) => client.query(txt, value)));

  await client.end()
  
  console.log('Seeding done!')
}

populate();