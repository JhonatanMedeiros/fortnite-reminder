const itemsEnv: string = process.env.REMINDER_ITEMS || '';

const REMINDER_ITEMS_IDS: string[] = itemsEnv.split(',');

// Check if item has in shop from reminder items
const hasItemInShop = (itemId: string) => {
	const items_ids = REMINDER_ITEMS_IDS.map(item => item.toLowerCase())
	return items_ids.includes(itemId.toLowerCase());
}

export { hasItemInShop };
