export type FortniteAPI_SHOP_Featured = {
	regularPrice: number;
	finalPrice: number;
	isBundle: boolean;
	isSpecial: boolean;
	giftable: boolean;
	refundable: boolean;
	panel: number;
	sortPriority: number;
	banner: string;
	items: FortniteAPI_SHOP_Item[];
}

export type FortniteAPI_SHOP_Daily = {
	regularPrice: number;
	finalPrice: number;
	isBundle: boolean;
	isSpecial: boolean;
	giftable: boolean;
	refundable: boolean;
	panel: number;
	sortPriority: number;
	banner?: any;
	items: FortniteAPI_SHOP_Item[];
}

export type FortniteAPI_SHOP_Item = {
	id: string;
	type: string;
	backendType: string;
	rarity: string;
	displayRarity: string;
	backendRarity: string;
	name: string;
	shortDescription: string;
	description: string;
	set?: any;
	setText?: any;
	series?: any;
	backendSeries?: any;
	images: any;
	variants?: any;
	gameplayTags: string[];
	displayAssetPath?: any;
	definition?: any;
	requiredItemId?: any;
	builtInEmoteId?: any;
	path: string;
	lastUpdate: string;
	added: string;
}

export type FortniteAPI_SHOP = {
	status: number;
	data: {
		hash: string;
		date: string;
		featured: FortniteAPI_SHOP_Featured[];
		daily: FortniteAPI_SHOP_Daily[];
		votes: any;
		voteWinners: any;
	}
}
