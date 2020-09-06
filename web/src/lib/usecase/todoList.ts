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

	async create(title: string) {
		const newTodo = await this.inputPort.post(title)
		this.outputPort.addTodo(newTodo)
	}

	check(id: string) {
		this.outputPort.checkTodoById(id);
	}

	uncheck(id: string) {
		this.outputPort.uncheckTodoById(id);
	}

	delete(id: string) {
		this.outputPort.deleteTodoById(id);
	}
}