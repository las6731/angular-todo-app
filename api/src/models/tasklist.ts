import { Task } from './task';

export class TaskList {
	id: number;
	title: string;
	description_html: string;
	owner_id: string;
	created_at: string;
	updated_at: string;
	tasks: Task[];

	constructor(
		id: number,
		title: string,
		description_html: string,
		owner_id: string,
		created_at: string,
		updated_at: string,
		tasks?: Task[]
	) {
		this.id = id;
		this.title = title;
		this.description_html = description_html;
		this.owner_id = owner_id;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.tasks = tasks || [];
	}
}
