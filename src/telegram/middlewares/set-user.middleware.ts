import { Middleware } from 'grammy';

import { CustomContext } from '../context';
import { findUser } from '../../prisma/find-user';

export const setUserMiddleware = (): Middleware<CustomContext> => async (ctx, next) => {
	console.log(ctx);
	if (ctx.from?.is_bot === false) {
		const { id: telegramId } = ctx.from;
		ctx.telegramChat = await findUser(telegramId);
	}

	return next();
};
