import 'dotenv/config'
import { once } from 'events';
import { createServer } from './server';
import { createBot } from './telegram';
import { prisma } from './prisma';
import { logger } from './logger';
import { createJob } from './cron';

async function main() {
	const bot = createBot();
	await bot.init();

	const job = createJob({ bot })

	job.start();
	logger.info({
		msg: '::JOB:: Is job running',
		running: job.running || false,
	})

	const { server, port } = createServer({
		bot,
		job
	});

	// Graceful shutdown
	prisma.$on('beforeExit', async () => {
		logger.info("shutdown");

		await bot.stop();
		await server.close();
	});

	await prisma.$connect();

	const listenServer = server.listen(port);
	await once(listenServer, 'listening');

	await bot.start({
		onStart: ({ username }) =>
			logger.info({
				msg: 'bot running...',
				username,
			}),
	});
}

main().catch(err => {
	logger.error(err);
	process.exit(1);
});

process.on('uncaughtException', (error, origin) => logger.error(`\n${origin} signal received. \n${error}`));
process.on('unhandledRejection', (error) => logger.error(`\nunhandledRejection signal received. \n${error}`));
