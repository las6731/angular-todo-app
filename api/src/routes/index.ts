import Router = require('koa-router');
import tasks from './tasks';
import lists from './lists';

const router = new Router({ prefix: '/api' });
const routers: Router[] = [ tasks, lists ];

routers.forEach((r: Router) => {
	router.use(r.routes(), r.allowedMethods());
});

router.get('/', (ctx) => {
	ctx.body = { msg: 'Hello world!' };
});

export default router;
