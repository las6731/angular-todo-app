import { Pool } from 'pg';
import * as config from '../config';

const pool = new Pool({
	user: config.POSTGRES_USER,
	host: config.POSTGRES_HOST,
	database: config.POSTGRES_DB,
	password: config.POSTGRES_PW,
	port: config.POSTGRES_PORT
});

export default pool;
