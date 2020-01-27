import Koa = require('koa');
import router from './routes';
import bodyParser = require('koa-bodyparser');
import logger = require('koa-logger');
import json = require('koa-json');
import dotenv = require('dotenv');

const app = new Koa();

// Middlewares
dotenv.config();
app.use(bodyParser());
app.use(logger());
app.use(json());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000 || process.env.PORT, () => {
	console.log('Koa started');
});
