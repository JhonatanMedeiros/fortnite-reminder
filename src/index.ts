import 'dotenv/config'
import cron from 'cron';
import FortniteAPI, { getItemsFromShop } from './FortniteAPI';
import TelegramAlert from './telegram';

import { hasItemInShop } from './reminder';

const start = async () => {
	try {
		const response = await FortniteAPI.shop();
		const { data } = response;
		const items = getItemsFromShop(data);
		const itemsToRemind = items.filter(item => hasItemInShop(item.id));

		if (itemsToRemind.length > 0) {
			await TelegramAlert.sendMessage(`🎉🎉🎉 ${itemsToRemind.length} items are available in the shop`);
		} else {
			console.log('No items available in the shop');
			await TelegramAlert.sendMessage('🚫 No items available in the shop');
		}
	} catch (error) {
		console.error(error);
		await TelegramAlert.sendMessage('‼️ Error occurred. Check the console!');
	}

}

console.log('Job initialized');
const job = new cron.CronJob('1 9 * * *', async () => {
	await TelegramAlert.sendMessage('🔍 Checking for items in the shop...');
	await start();
});

job.start();
