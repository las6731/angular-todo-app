import Router = require('koa-router');
import * as db from '../db';
import { TaskList } from '../models/tasklist';
import { Permission } from '../models/permission';

const router = new Router({ prefix: '/lists' });

router.get('/:listId', async (ctx) => {
	ctx.body = await db.lists.getListWithTasks(ctx.params.listId);
});

router.post('/', async (ctx) => {
	const list = ctx.request.body as TaskList;
	ctx.body = await db.lists.createList(list);
});

router.put('/:listId', async (ctx) => {
	const list = ctx.request.body as TaskList;

	ctx.assert(list.id == ctx.params.listId, 404, `No list found with id ${list.id}!`);
	// ctx.assert(
	// 	(await db.lists.userHasPermission(list.id, ctx.userId)) == Permission.edit,
	// 	401,
	// 	'User not authorized to update this list!'
	// );

	ctx.body = await db.lists.updateList(list);
});

router.put('/:listId/permission/:userId', async (ctx) => {
	console.log(ctx.request.body);

	const perm: Permission = Permission[ctx.request.body];
	console.log({ perm });

	// ctx.assert(
	// 	(await db.lists.userHasPermission(ctx.params.listId, ctx.userId)) == Permission.edit,
	// 	401,
	// 	'User not authorized to update this list!'
	// );

	ctx.body = await db.lists.setPermission(ctx.params.listId, ctx.params.userId, perm);
});

export default router;
