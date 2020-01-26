import Router = require('koa-router');

const router = new Router({ prefix: '/api' });
const routers: Router[] = [];

routers.forEach((r: Router) => {
	router.use(r.routes(), r.allowedMethods());
});

router.get('/', (ctx) => {
	ctx.body = { msg: 'Hello world!' };
});

export default router;
