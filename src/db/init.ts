import { Client } from 'pg';
import { dbConfig } from '@/config/db-config';

const stmt = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(20) NOT NULL,
    text VARCHAR(255) NOT NULL,
    created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );
`;

async function initialize() {
	console.log('Initializing database ...');

	const client = new Client(dbConfig);
  await client.connect()
  await client.query(stmt)
  await client.end()

  console.log('Initialization done!')
}

initialize();
