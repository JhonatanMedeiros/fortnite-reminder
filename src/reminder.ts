const REMINDER_ITEMS_IDS: string[] = ['EID_KitchenNavigator'];

// Check if item has in shop from reminder items
const hasItemInShop = (itemId: string) => {
	return REMINDER_ITEMS_IDS.includes(itemId);
}

export { hasItemInShop };
