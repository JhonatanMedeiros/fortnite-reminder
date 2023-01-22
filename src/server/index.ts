import http from 'http';
import express from 'express';
import { Bot } from 'grammy';
import { CronJob } from 'cron';

import { config } from '../config';
import { logger, loggerHttp } from '../logger';

const port = config.SERVER_PORT;

export const createServer = ({ bot, job }: { bot: Bot, job: CronJob }) => {

	const app = express();

	app.use(loggerHttp)

	app.get('/', (req, res) => {
		return res.json({
			msg: 'Hello! I am FORTNITE REMINDER API',
		})
	});

	app.get('/ping', (req, res) => {
		return res.json({
			message: '✅ Pong',
		})
	});

	app.get('/status', (req, res) => {
		const telegram = bot.botInfo;
		return res.json({
			telegram: !!telegram,
			job: job?.running || false,
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
			await bot.api.sendMessage(config.TELEGRAM_CHAT_ID, '✅ Pong from server');

			return res.status(200).json({
				status: 200,
				message: 'Telegram is works'
			});

		} catch (e) {
			logger.error(e);
			return res.status(500).json({
				message: 'Telegram fail'
			})
		}
	});

	app.set('port', port);

	const server = http.createServer(app);

	server.on('error', (error: Error) => logger.error(error));

	server.on('close', () => 'Fortnite Reminder API on close');

	server.on('listening', () => {
		logger.info(`FORTNITE REMINDER API is listen on PORT ${port} in mode ${config.NODE_ENV}`);
	});

	return {
		server,
		port
	};
}
