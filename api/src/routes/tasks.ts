import Router = require('koa-router');
import * as db from '../db';
import { Task } from '../models/task';

const router = new Router({ prefix: '/tasks' });

router.get('/:listId', async (ctx) => {
	ctx.body = await db.tasks.getTasksInList(ctx.params.listId);
});

router.post('/', async (ctx) => {
	let task = ctx.request.body as Task;
	ctx.body = await db.tasks.createTask(task);
});

router.put('/:taskId', async (ctx) => {
	let task = ctx.request.body as Task;
	ctx.body = await db.tasks.updateTask(task);
});

export default router;
