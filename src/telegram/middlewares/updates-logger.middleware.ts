import { Middleware } from 'grammy';

import { CustomContext } from '../context';
import { logger } from '../../logger';

export const updatesLoggerMiddleware = (): Middleware<CustomContext> => (ctx, next) => {
	logger.debug({
		msg: 'update received',
		...ctx.update,
	});
	return next();
};
