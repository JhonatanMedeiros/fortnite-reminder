import { Bot } from 'grammy';

const { TELEGRAM_TOKEN } = process.env;

export const createBot = () => {
	const bot = new Bot(TELEGRAM_TOKEN as string);

	// Handle the /start command.
	bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'));

	// Handle other messages.
	bot.on('message', (ctx) => ctx.reply('Got another message!'));

	return bot;
};
