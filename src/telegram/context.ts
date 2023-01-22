import { Context } from 'grammy';
import { Chat } from '@prisma/client';

export type CustomContext = Context & {
	telegramChat?: Chat;
};
