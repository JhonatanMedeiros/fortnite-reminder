import express from 'express';

import { job } from '../cron';

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) =>
	res.json({
		msg: 'Hello! I am FORTNITE REMINDER API',
	}),
);

app.get('/cron', (req, res) => {
	if (!job) {
		return res.status(500).json({
			message: 'Job not iniliazed!'
		})
	}

	const currentDate = new Date();
	const nextDates = job.nextDates(5)

	return res.status(200).json({
		isRunning: job?.running || false,
		currentDate,
		nextDates
	});
});


app.set('port', PORT);

export default app;
