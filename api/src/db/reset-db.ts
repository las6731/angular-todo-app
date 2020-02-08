import pool from './pool';

async function resetSchema() {
	process.stdout.write('Resetting DB schema...');
	await pool.query(`
        DROP SCHEMA public CASCADE;
        CREATE SCHEMA public;

        CREATE TYPE permission AS ENUM ('edit', 'view');

        CREATE TABLE tasks (
            id                  serial  PRIMARY KEY,
            title               text    NOT NULL,
            description_html    text    NOT NULL    DEFAULT '',
            completed           boolean NOT NULL    DEFAULT false,
            list_id             serial  NOT NULL
        );

        CREATE TABLE task_lists (
            id                  serial      PRIMARY KEY,
            title               text        NOT NULL,
            description_html    text        NOT NULL    DEFAULT '',
            owner_id            text        NOT NULL,
            created_at          timestamptz NOT NULL    DEFAULT NOW(),
            updated_at          timestamptz NOT NULL    DEFAULT NOW()
        );

        CREATE TABLE permissions (
            id      serial  PRIMARY KEY,
            list_id serial  NOT NULL,
            user_id text    NOT NULL,
            perm    permission  NOT NULL    DEFAULT 'view',
            CONSTRAINT list_user UNIQUE (list_id, user_id)
        );

        CREATE TABLE users (
            id          text    PRIMARY KEY,
            username    text    NOT NULL,
            picture     text    NULL
        );

        CREATE TABLE notifications (
            id      serial  PRIMARY KEY,
            user_id text    NOT NULL,
            list_id serial  NOT NULL,
            message text    NOT NULL
        );
    `);
	console.log('completed');
}

async function resetDb() {
	await resetSchema();
}

if (!module.parent) {
	// called from CLI
	const succBack = () => {
		console.log('Database reset!');
		process.exit();
	};
	const errBack = (err: any) => {
		console.error('Caught error while resetting database: ', err, err.stack);
	};

	console.log('Resetting database...');
	resetDb().then(succBack, errBack);
}
