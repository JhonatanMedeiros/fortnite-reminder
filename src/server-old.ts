/*
import 'dotenv/config'
import http from 'http';

import { job } from './cron';
import app from './server-old';
import { index } from './index/index';
import { bot } from './telegram/telegram';

const server = http.createServer(app);

const PORT = app.get('port');

server.listen(PORT);

/!**
 * ServerOld Events
 *!/
server.on('error', (error: Error) => console.log(error));
server.on('close', () => 'Fortnite Reminder API on close');
server.on('listening', async () => {
	await index.$connect();

	console.log(`Prisma connect with success`);

	await bot.start({
		onStart: (data) => console.log(data)
	});

	console.log(`Telegram Bot connect with success`);

	console.log(`FORTNITE REMINDER API is listen on PORT ${PORT} in mode ${process.env.NODE_ENV}`);

	// console.log(process.env.REMINDER_ITEMS);
	// console.log(process.env.TZ);
	// console.log(new Date().toLocaleString('pt-BR'));
	//
	// console.log('Job initialized');
	// job.start();
	// console.log('is job running? ', job.running || false);
});


/!**
 * Nodejs Events
 *!/
process.on('uncaughtException', (error, origin) => console.log(`\n${origin} signal received. \n${error}`));
process.on('unhandledRejection', (error) => console.log(`\nunhandledRejection signal received. \n${error}`));
*/
