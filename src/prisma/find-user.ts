import { prisma } from './index';

export const findUser = async (telegramId: number) => {
	return prisma.chat.upsert({
		where: {
			telegramId
		},
		create: {
			telegramId
		},
		update: {}
	});
}
