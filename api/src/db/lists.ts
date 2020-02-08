import pool from './pool';
import { Task } from '../models/task';
import { TaskList } from '../models/tasklist';
import { Permission } from '../models/permission';

export const getList = async function(list_id: number) {
	return pool.query(
		`
        SELECT * FROM task_lists
        WHERE id = $1
        `,
		[ list_id ]
	);
};

// export const getListWithTasks = async function(list_id: number, user_id: string) {
// 	return pool
// 		.query(
// 			`
//             SELECT list.*, array_agg(to_json(task)) as tasks
//             FROM task_lists list
//             LEFT JOIN tasks task ON task.list_id = list.id
//             INNER JOIN permissions perms ON perms.list_ud = list.id AND perms.user_id = $2
//             WHERE list.id = $1
//             GROUP BY list.id
//             `,
// 			[ list_id, user_id ]
// 		)
// 		.then((res) => {
// 			res.rows.forEach((row) => {
// 				row.tasks = row.tasks as Task[];
// 			});
// 			return res.rows as TaskList[];
// 		});
// };

export const getListWithTasks = async function(list_id: number) {
	return pool
		.query(
			`
            SELECT list.*, array_agg(to_json(task)) as tasks
            FROM task_lists list
            LEFT JOIN tasks task ON task.list_id = list.id
            WHERE list.id = $1
            GROUP BY list.id
            `,
			[ list_id ]
		)
		.then((res) => {
			res.rows.forEach((row) => {
				row.tasks = row.tasks as Task[];
			});
			return res.rows as TaskList[];
		});
};

// export const updateList = async function(list: TaskList, user_id: string) {
// 	return userHasPermission(list.id, user_id).then((perm) => {
// 		return perm == Permission.edit
// 			? pool
// 					.query(
// 						`
//                         UPDATE task_lists
//                         SET title = $2, description_html = $3, updated_at = NOW()
//                         WHERE id = $1
//                         RETURNING *
//                         `,
// 						[ list.id, list.title, list.description_html ]
// 					)
// 					.then(() => {
// 						return true;
// 					})
// 			: false;
// 	});
// };

export const updateList = async function(list: TaskList) {
	return pool.query(
		`
        UPDATE task_lists
        SET title = $2, description_html = $3, updated_at = NOW()
        WHERE id = $1
        RETURNING *
        `,
		[ list.id, list.title, list.description_html ]
	);
};

export const createList = async function(list: TaskList) {
	return pool.query(
		`
        INSERT INTO task_lists (title, description_html, owner_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
		[ list.title, list.description_html, list.owner_id ]
	);
};

export const userHasPermission = async function(list_id: number, user_id: string) {
	return pool
		.query(
			`
            SELECT perm FROM permissions
            WHERE list_id = $1 AND user_id = $2
            `,
			[ list_id, user_id ]
		)
		.then((res) => {
			return (res.rows[0].perm as Permission) || Permission.none;
		});
};

export const setPermission = async function(list_id: number, user_id: string, perm: Permission) {
	if (perm == Permission.none) {
		return pool.query(
			`
            DELETE FROM permissions
            WHERE list_id = $1 AND user_id = $2
            `,
			[ list_id, user_id ]
		);
	} else {
		return pool.query(
			`
            INSERT INTO permissions (list_id, user_id, perm)
            VALUES ($1, $2, $3)
            ON CONFLICT (list_id, user_id)
            DO UPDATE SET perm = $3
            `,
			[ list_id, user_id, Permission[perm] ]
		);
	}
};
