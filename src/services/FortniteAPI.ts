import axios from 'axios';
import { FortniteAPI_SHOP, FortniteAPI_SHOP_Item } from '../types';

const BASE_URL = 'https://fortnite-api.com';
const api = axios.create({ baseURL: BASE_URL });

const FortniteAPI = {
	shop: async () => {
		return await api.get<FortniteAPI_SHOP>('/shop/br');
	}
}

const getItemsFromShop = (shopData: FortniteAPI_SHOP): FortniteAPI_SHOP_Item[] => {
	const { featured, daily } = shopData.data;
	const items = [...featured, ...daily];
	return items.reduce((acc: FortniteAPI_SHOP_Item[] , item) => {
		return [...acc, ...item.items];
	}, []);
}

const getItemPhoto = (item: FortniteAPI_SHOP_Item): string | null => {
	const { images } = item;
	if (!images) return null;
	const { featured, icon } = images;
	return featured?.url || icon?.url || null;
}

export default FortniteAPI;
export { getItemsFromShop, getItemPhoto };
