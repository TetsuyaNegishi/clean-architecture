import { Injectable } from "@nestjs/common";
import { Todo } from "src/domain/Todo";
import { TodoPort } from "../port/todo";

@Injectable()
export class TodoUsecase {
	constructor(private readonly todoPort: TodoPort) {}

	async getAll() {
		return await this.todoPort.getAll()
	}

	async update(todoId: string, { title, checked }: Partial<Omit<Todo, 'id'>>) {
		let todo = await this.todoPort.get(todoId)
		todo = title ? todo.updateTitle(title) : todo;
		todo = checked ? todo.check() : todo.uncheck();
		await this.todoPort.update(todo)
		return todo
	}

	async create(title: string) {
		const todo = this.todoPort.create(title)
		return todo
	}

	async delete(id: string) {
		await this.todoPort.delete(id)
	}
}
