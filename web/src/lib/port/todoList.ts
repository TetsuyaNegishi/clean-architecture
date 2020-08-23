import { Todo } from '../domain/todo'

export interface InputTodoListPort {
	fetch: () => Promise<Todo[] | Error>
}

export interface OutputTodoListPort {
	storeTodoList: (todoList: Todo[]) => void
}