import { Bot as TelegramBot } from "grammy";

import { config } from '../config';
import { CustomContext } from './context';


import { updatesLoggerMiddleware } from './middlewares/updates-logger.middleware';
import { setUserMiddleware } from './middlewares/set-user.middleware';

export const createBot = () => {
	const bot = new TelegramBot<CustomContext>(config.TELEGRAM_TOKEN);

	if (config.isDev) {
		bot.use(updatesLoggerMiddleware)
	}

	bot.use(setUserMiddleware)

	// Handle the /start command.
	bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'));

	// Handle other messages.
	bot.on('message', (ctx) => ctx.reply('Got another message!'));

	return bot;
};
