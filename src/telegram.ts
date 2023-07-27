import axios from 'axios';

const TELEGRAM_API = 'https://api.telegram.org';
const { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env;

const TelegramAlert = {
	sendMessage: async (message: string) => {
		const api = `${TELEGRAM_API}/bot${TELEGRAM_TOKEN}/sendMessage`
		return await axios.post(api, { chat_id: TELEGRAM_CHAT_ID, text: message })
	},
	sendPhoto: async (caption: string, photo_url: string) => {
		const api = `${TELEGRAM_API}/bot${TELEGRAM_TOKEN}/sendPhoto`
		return await axios.post(api, { chat_id: TELEGRAM_CHAT_ID, caption, photo: photo_url })
	},
}

export default TelegramAlert;
