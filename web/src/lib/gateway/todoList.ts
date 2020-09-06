import { InputTodoListPort } from "../port/todoList";
import { TodoListDriver, TodoValueType } from "../driver/todoList";
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
		const todoDomainList = todoList.map(this.transformTodoValueToTodoDomain)

		return todoDomainList
	}

	async post(title: string) {
		const response = await this.driver.post(title);
		const todoDomain = this.transformTodoValueToTodoDomain(response)
		return todoDomain;
	}

	private transformTodoValueToTodoDomain(todoValue: TodoValueType ) {
		const {id, title, checked} = todoValue;
		return new Todo(id, title, checked);
	};
}