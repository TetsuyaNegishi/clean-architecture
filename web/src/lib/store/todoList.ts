import { observable, action } from 'mobx';
import { OutputTodoListPort } from '../port/todoList';
import { Todo } from '../domain/todo';

export class TodoListStore implements OutputTodoListPort {
	@observable value: Todo[] = [];

	@action setTodoList(todoList: Todo[]) {
		this.value = todoList;
	}

	storeTodoList(todoList: Todo[]) {
		this.setTodoList(todoList)
	}
}
