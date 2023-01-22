import 'dotenv/config';
import { cleanEnv, str, num } from 'envalid';

export const config = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ["development", "production"] }),
	LOG_LEVEL: str({
		choices: ["trace", "debug", "info", "warn", "error", "fatal", "silent"],
	}),
	SERVER_PORT: num({
		default: 3000,
	}),
	DATABASE_URL: str(),
	TELEGRAM_CHAT_ID: str(),
	TELEGRAM_TOKEN: str(),
	REMINDER_ITEMS: str(),
	TZ: str(),
});
