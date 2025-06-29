import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import url from 'url';

import { router as indexRoutes } from '@/routes/index';

// Load environment variables
dotenv.config();

// Get __dirname
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set 'view engine'
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev')); // Or 'combined' for production
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
	res.status(200).json({
		status: 'OK',
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	});
});

// 404 handler
app.use('*', (req, res) => {
	res.status(404).json({
		error: 'Route not found',
		path: req.originalUrl,
	});
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.stack);

	res.status(500).json({
		error: 'Something went wrong!',
		message: process.env.NODE_ENV === 'development' ? err.message : undefined,
	});
});

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`);
	console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});
