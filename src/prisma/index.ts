import { Prisma, PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
	log: [
		{
			emit: "event",
			level: "query",
		},
		{
			emit: "event",
			level: "error",
		},
		{
			emit: "event",
			level: "info",
		},
		{
			emit: "event",
			level: "warn",
		},
	],
});

prisma.$on("error", (e: Prisma.LogEvent) => {
	console.error({
		msg: "database error",
		target: e.target,
		message: e.message,
	});
});

prisma.$on("info", (e: Prisma.LogEvent) => {
	console.info({
		msg: "database info",
		target: e.target,
		message: e.message,
	});
});

prisma.$on("warn", (e: Prisma.LogEvent) => {
	console.warn({
		msg: "database warning",
		target: e.target,
		message: e.message,
	});
});
