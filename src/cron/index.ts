import cron from 'cron';
import { Bot } from 'grammy';

import { config } from '../config';
import { logger } from '../logger';
import { hasItemInShop } from '../utils/reminder';
import FortniteAPI, { getItemsFromShop } from '../services/FortniteAPI';

const CRON_JOB = '0 21 * * *';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const start = async (bot: Bot) => {
	const telegramChat = config.TELEGRAM_CHAT_ID;
	try {
		logger.info('::JOB:: Getting Fortnite Shop...');
		const response = await FortniteAPI.shop();
		const { data } = response;
		const items = getItemsFromShop(data);
		const itemsToRemind = items.filter(item => hasItemInShop(item.id));

		if (itemsToRemind.length > 0) {
			await bot.api.sendMessage(telegramChat, `🎉🎉🎉 ${itemsToRemind.length} items are available in the shop`);
		} else {
			logger.info('No items available in the shop');
			await bot.api.sendMessage(telegramChat, '🚫 No items available in the shop');
		}
	} catch (error) {
		logger.error(error);
		await bot.api.sendMessage(telegramChat, '‼️ Error occurred. Check the console!');
	}

}

export const createJob = ({ bot }: { bot: Bot }) => {
	return new cron.CronJob(CRON_JOB, async () => {
		logger.info('::JOB:: Starting job...');

		const startJobDate = new Date();
		logger.info('::JOB:: Started job:', startJobDate);

		await sleep(60000); // await 1 minute

		// Send message to bot
		// await TelegramAlert.sendMessage('🔍 Checking for items in the shop...');

		// Start Fortnite API
		await start(bot);

		const endJobDate = new Date();
		logger.info('::JOB:: Ended Job:', endJobDate);
	}, null, false, config.TZ);
}
