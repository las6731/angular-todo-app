export class Task {
	id: number;
	title: string;
	description_html: string;
	completed: boolean;
	list_id: number;

	constructor(id: number, title: string, description_html: string, completed: boolean, list_id: number) {
		this.id = id;
		this.title = title;
		this.description_html = description_html;
		this.completed = completed;
		this.list_id = list_id;
	}
}
