import http from 'http';
import express from 'express';
import { Bot } from 'grammy';

import { job } from '../cron';

const port = process.env.PORT || 3000;

export const createServer = ({ bot }: { bot: Bot }) => {

	const app = express();

	app.get('/', (req, res) => {
		return res.json({
			msg: 'Hello! I am FORTNITE REMINDER API',
		})
	});

	app.get('/cron', (req, res) => {
		if (!job) {
			return res.status(500).json({
				message: 'Job not iniliazed!'
			})
		}

		const currentDate = new Date().toISOString();
		const currentDateLocale = new Date().toLocaleString('pt-BR');
		const nextDates = job.nextDates(5)

		return res.status(200).json({
			isRunning: job?.running || false,
			currentDateLocale,
			currentDate,
			nextDates
		});
	});

	app.get('/telegram', async (req, res) => {
		try {
			await bot.api.sendMessage('', '✅ Pong from server');

			return res.status(200).json({
				status: 200,
				message: 'Telegram is works'
			});

		} catch (e) {
			console.error(e);
			return res.status(500).json({
				message: 'Telegram fail'
			})
		}
	});

	app.set('port', port);

	const server = http.createServer(app);

	server.on('error', (error: Error) => console.log(error));

	server.on('close', () => 'Fortnite Reminder API on close');

	server.on('listening', () => {
		console.log(`FORTNITE REMINDER API is listen on PORT ${port} in mode ${process.env.NODE_ENV}`);
	});

	return {
		server,
		port
	};
}
