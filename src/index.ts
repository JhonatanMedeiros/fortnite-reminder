import 'dotenv/config'
import FortniteAPI, { getItemsFromShop } from './FortniteAPI';
import TelegramAlert from './telegram';
import { hasItemInShop } from './reminder';

const main = async () => {
	try {
		const response = await FortniteAPI.shop();
		const { data } = response;
		const items = getItemsFromShop(data);
		const itemsToRemind = items.filter(item => hasItemInShop(item.id));

		if (itemsToRemind.length > 0) {
			await TelegramAlert.sendMessage(`${itemsToRemind.length} items are available in the shop`);
		} else {
			console.log('No items available in the shop');
			await TelegramAlert.sendMessage('No items available in the shop');
		}
	} catch (error) {
		console.error(error);
		await TelegramAlert.sendMessage('Error occurred. Check the console!');
	}

}

main();
