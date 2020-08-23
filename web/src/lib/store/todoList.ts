import { observable, action } from 'mobx';
import { OutputTodoListPort } from '../port/todoList';
import { Todo } from '../domain/todo';

type ValueType = {
	title: string;
	checked: boolean;
}[]

export class TodoListStore implements OutputTodoListPort {
	@observable value: ValueType = [];

	@action setTodoList(todoList: Todo[]) {
		this.value = todoList.map(({title, checked}) => ({title, checked}));
	}

	storeTodoList(todoList: Todo[]) {
		this.setTodoList(todoList)
	}
}
