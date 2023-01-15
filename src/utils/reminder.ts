const itemsEnv: string = process.env.REMINDER_ITEMS || '';

const REMINDER_ITEMS_IDS: string[] = itemsEnv.split(',');

// Check if item has in shop from reminder items
const hasItemInShop = (itemId: string) => {
	return REMINDER_ITEMS_IDS.includes(itemId);
}

export { hasItemInShop };
