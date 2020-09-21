import { Injectable } from "@nestjs/common";
import { Todo, Todos } from "../domain/Todo";
import { TodoDriver } from "../driver/todo";
import { TodoPort } from "../port/todo";

@Injectable()
export class TodoGateway implements TodoPort{
	constructor(private readonly driver: TodoDriver) {}

	async getAll(): Promise<Todos> {
		const todosJson = await this.driver.findAll();
		const todos = todosJson.map(this.transformJsonToDomain)
		return todos
	}

	private transformJsonToDomain({ id, title, checked }: {id: string, title: string, checked: boolean}) {
		return new Todo(id, title, checked);
	};
}
