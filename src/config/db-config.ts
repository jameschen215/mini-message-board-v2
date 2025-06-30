import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
	host: process.env.DB_HOST || 'localhost',
	port: Number(process.env.DB_PORT || '5432'),
	database: process.env.DB_NAME || 'top_users',
	password: process.env.DB_PASSWORD || '',
	user: process.env.DB_USER || 'chenjian',
};

const pool = new Pool(dbConfig);
export const query = (text: string, params?: any[]) => pool.query(text, params);
