import 'dotenv/config'
import { createServer } from './server';
import { createBot } from './telegram';
import { prisma } from './prisma';

async function main() {
	const bot = createBot();
	await bot.init();

	const { server, port } = createServer({
		bot
	});

	// Graceful shutdown
	prisma.$on('beforeExit', async () => {
		console.info('shutdown');

		await bot.stop();
		await server.close();
	});

	await prisma.$connect();

	await server.listen(port);

	await bot.start({
		onStart: ({ username }) =>
			console.info({
				msg: 'bot running...',
				username,
			}),
	});
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});

process.on('uncaughtException', (error, origin) => console.log(`\n${origin} signal received. \n${error}`));
process.on('unhandledRejection', (error) => console.log(`\nunhandledRejection signal received. \n${error}`));
