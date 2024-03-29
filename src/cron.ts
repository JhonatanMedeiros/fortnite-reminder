import cron from 'cron';
import FortniteAPI, { getItemsFromShop, getItemPhoto } from './services/FortniteAPI';
import TelegramAlert from './telegram';

import { hasItemInShop } from './utils/reminder';

const CRON_JOB = '0 21 * * *';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const start = async () => {
	try {
		console.log('Getting Fortnite Shop...')
		const response = await FortniteAPI.shop();
		const { data } = response;
		const items = getItemsFromShop(data);
		const itemsToRemind = items.filter(item => hasItemInShop(item.id));

		if (itemsToRemind.length > 0) {
			await TelegramAlert.sendMessage(`🎉🎉🎉 ${itemsToRemind.length} items are available in the shop`);

			const promises = itemsToRemind.map(async (item) => {
				const photo_url = getItemPhoto(item);
				if (photo_url) {
					await TelegramAlert.sendPhoto(item?.name, photo_url);
					return;
				}
				await TelegramAlert.sendMessage(item?.name);
			});

			await Promise.all(promises);
		} else {
			console.log('No items available in the shop');
			await TelegramAlert.sendMessage('🚫 No items available in the shop');
		}
	} catch (error) {
		console.error(error);
		await TelegramAlert.sendMessage('‼️ Error occurred. Check the console!');
	}

}

const job = new cron.CronJob(CRON_JOB, async () => {
	console.log('Starting job...');

	const startJobDate = new Date();
	console.log('Started job:', startJobDate);

	await sleep(60000); // await 1 minute

	// Send message to bot
	await TelegramAlert.sendMessage('🔍 Checking for items in the shop...');

	// Start Fortnite API
	await start();

	const endJobDate = new Date();
	console.log('Ended Job:', endJobDate);
}, null, false, process.env.TZ || '');

export {
	job
};
