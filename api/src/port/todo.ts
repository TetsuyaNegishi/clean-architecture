import { Todo, Todos } from "src/domain/Todo";

export abstract class TodoPort {
	getAll: () => Promise<Todos>;
	get: (id: string) => Promise<Todo>;
	update: (todo: Todo) => Promise<Todo>;
	create: (titile: string) => Promise<Todo>;
	delete: (id: string) => Promise<void>;
}
