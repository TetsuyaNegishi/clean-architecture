import { Todos } from "src/domain/Todo";

export abstract class TodoPort {
	getAll: () => Promise<Todos>;
}
