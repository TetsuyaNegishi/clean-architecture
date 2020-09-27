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

	async get(id: string) {
		const todoJson = await this.driver.find(id);
		const todo = this.transformJsonToDomain(todoJson)
		return todo
	}

	async update(todo: Todo) {
		const todoJson = todo.toJson();
		this.driver.update(todoJson)
		return todo
	}

	async create(title: string) {
		const todoJson = await this.driver.create({title, checked: false})
		const todo = this.transformJsonToDomain(todoJson)
		return todo;
	}

	async delete(todoId: string) {
		await this.driver.delete(todoId)
	}

	private transformJsonToDomain({ id, title, checked }: {id: string, title: string, checked: boolean}) {
		return new Todo(id, title, checked);
	}
}
