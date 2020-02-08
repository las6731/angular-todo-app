import pool from './pool';
import { Task } from '../models/task';

export const getTasksInList = async function(list_id: number) {
	return pool
		.query(
			`
            SELECT * FROM tasks
            WHERE list_id = $1
            `,
			[ list_id ]
		)
		.then((res) => res.rows as Task[]);
};

export const updateTask = async function(task: Task) {
	return pool.query(
		`
        UPDATE tasks
        SET title = $2, description_html = $3, completed = $4, list_id = $5
        WHERE id = $1
        RETURNING *
        `,
		[ task.id, task.title, task.description_html, task.completed, task.list_id ]
	);
};

export const createTask = async function(task: Task) {
	return pool.query(
		`
        INSERT INTO tasks (title, description_html, list_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
		[ task.title, task.description_html, task.list_id ]
	);
};
