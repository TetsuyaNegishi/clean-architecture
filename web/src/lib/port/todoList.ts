import { Todo } from '../domain/todo'

export interface TodoListPort {
	fetch: () => Promise<Todo[] | Error>;
	post: (title: string) => Promise<Todo>;
	check: (todoId: string) => Promise<Todo>;
	uncheck: (todoId: string) => Promise<Todo>;
}

export interface OutputTodoListPort {
	storeTodoList: (todoList: Todo[]) => void;
	checkTodoById: (todoId: string) => void;
	uncheckTodoById: (todoId: string) => void;
	deleteTodoById: (todoId: string) => void;
	addTodo: (todo: Todo) => void;
}
