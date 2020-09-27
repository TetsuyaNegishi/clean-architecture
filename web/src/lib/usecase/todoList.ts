import { TodoListPort, OutputTodoListPort } from "../port/todoList";

export class TodoListUsecase {
	constructor(private todoListPort: TodoListPort, private outputPort: OutputTodoListPort) {}

	async fetch() {
		const todoList = await this.todoListPort.fetch();
		if (todoList instanceof Error) {
			console.error('todo-list usecase: input port error')
			return
		}
		this.outputPort.storeTodoList(todoList);
	}

	async create(title: string) {
		const newTodo = await this.todoListPort.post(title)
		this.outputPort.addTodo(newTodo)
	}

	check(id: string) {
		this.outputPort.checkTodoById(id);
		this.todoListPort.check(id).catch(err => console.error(err));
	}

	uncheck(id: string) {
		this.outputPort.uncheckTodoById(id);
		this.todoListPort.uncheck(id).catch(err => console.error(err));
	}

	delete(id: string) {
		this.outputPort.deleteTodoById(id);
	}
}