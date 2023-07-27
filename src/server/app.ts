import express from 'express';

import { job } from '../cron';
import TelegramAlert from '../telegram';

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) =>
	res.json({
		msg: 'Hello! I am FORTNITE REMINDER API',
	}),
);

app.get('/cron', (req, res) => {
	if (!job) {
		return res.status(500).json({
			message: 'Job not initialized!'
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
		await TelegramAlert.sendMessage('✅ Pong from server');

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

app.set('port', PORT);

export default app;
