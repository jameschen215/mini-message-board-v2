import { Request, Response } from 'express';
import { formatDistanceToNow } from 'date-fns';

import { query } from '@/config/db-config';
import { MessageType } from '@/types/message';

export const indexController = (_req: Request, res: Response) => {
	res.render('index', { title: 'Hello, world!' });
};

export const getAllMessagesController = async (req: Request, res: Response) => {
	const { search } = req.query || '';
	let result;

	console.log(search);

	if (search) {
		result = await query(
			'SELECT * FROM messages WHERE username ILIKE $1 OR text ILIKE $1',
			[`%${search}%`]
		);
	} else {
		result = await query('SELECT * FROM messages');
	}

	const rows = result.rows as MessageType[];

	const messages = rows.map((row) => ({
		...row,
		formattedDate: formatDistanceToNow(row.created, { addSuffix: true }),
	}));

	res.render('index', { title: 'Messages', messages });
};