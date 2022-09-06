import http from 'http';

import { job } from './cron';
import app from './server/app';

const Server = http.createServer(app);

const PORT = app.get('port');

Server.listen(PORT);

/**
 * Server Events
 */
Server.on('error', (error: Error) => console.log(error));
Server.on('close', () => 'Fortnite Reminder API on close');
Server.on('listening', () => {
	console.log(`FORTNITE REMINDER API is listen on PORT ${PORT} in mode ${process.env.NODE_ENV}`);

	console.log('Job initialized');
	job.start();
	console.log('is job running? ', job.running);
});


/**
 * Nodejs Events
 */
process.on('uncaughtException', (error, origin) => console.log(`\n${origin} signal received. \n${error}`));
process.on('unhandledRejection', (error) => console.log(`\nunhandledRejection signal received. \n${error}`));
