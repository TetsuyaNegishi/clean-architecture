import { InputTodoListPort, OutputTodoListPort } from "../port/todoList";

export class TodoListUsecase {
	constructor(private inputPort: InputTodoListPort, private outputPort: OutputTodoListPort) {}

	async fetch() {
		const todoList = await this.inputPort.fetch();
		if (todoList instanceof Error) {
			console.error('todo-list usecase: input port error')
			return
		}
		this.outputPort.storeTodoList(todoList);
	}
}