import { Request, Response } from 'express';

export const indexController = (_req: Request, res: Response) => {
	res.render('index', { title: 'Hello, world!' });
};
