import Koa = require('koa');
import router from './routes';
import * as config from './config';
import bodyParser = require('koa-bodyparser');
import logger = require('koa-logger');
import json = require('koa-json');
import bouncer = require('koa-bouncer');

const app = new Koa();

// Middlewares
app.use(bodyParser({ enableTypes: [ 'json', 'text', 'form' ] }));
app.use(bouncer.middleware());
app.use(logger());
app.use(json());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.PORT || 3000, () => {
	console.log('Koa started');
});
