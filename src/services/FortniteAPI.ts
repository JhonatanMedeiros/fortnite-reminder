import axios from 'axios';
import { FortniteAPI_SHOP, FortniteAPI_SHOP_Item } from '../types';

const BASE_URL = 'https://fortnite-api.com';
const api = axios.create({ baseURL: BASE_URL });

const FortniteAPI = {
	shop: async () => {
		return await api.get<FortniteAPI_SHOP>('/shop/br');
	},
	cosmetics: async () => {
		const response = await api.get('/cosmetics/br');
		return response.data;
	},
	cosmeticsBy: async (cosmetic) => {
		const response = await api.get(`/cosmetics/br/${cosmetic}`);
		return response.data;
	}
}

const getItemsFromShop = (shopData: FortniteAPI_SHOP): FortniteAPI_SHOP_Item[] => {
	const { featured, daily } = shopData.data;
	const items = [...featured, ...daily];
	return items.reduce((acc: FortniteAPI_SHOP_Item[] , item) => {
		return [...acc, ...item.items];
	}, []);
}

export default FortniteAPI;
export { getItemsFromShop };
