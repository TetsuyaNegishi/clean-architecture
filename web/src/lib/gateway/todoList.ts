import { InputTodoListPort } from "../port/todoList";
import { TodoListDriver } from "../driver/todoList";
import { Todo } from "../domain/todo";

export class DriverFetchError extends Error {}

export class TodoListGateway implements InputTodoListPort {
	constructor(private driver: TodoListDriver) {}

	async fetch() {
		const response = await this.driver.fetch()
		if (response instanceof Error) {
			return new DriverFetchError();
		}

		const { todoList } = response;
		const todoDomainList = todoList.map(({ title, checked }) => {
			return new Todo(title, checked)
		})

		return todoDomainList
	}
}