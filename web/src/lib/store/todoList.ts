import { observable, action } from 'mobx';
import { OutputTodoListPort } from '../port/todoList';
import { Todo } from '../domain/todo';

type ValueType = {
	id: string;
	title: string;
	checked: boolean;
}[]

export class TodoListStore implements OutputTodoListPort {
	@observable value: ValueType = [];

	@action setTodoList(todoList: Todo[]) {
		this.value = todoList.map(({id, title, checked}) => ({id, title, checked}));
	}

	storeTodoList(todoList: Todo[]) {
		this.setTodoList(todoList)
	}

	@action checkTodoById(todoId: string) {
		const index = this.findTodoIndex(todoId);
		this.checkTodoByIndex(index, true);
	}

	@action uncheckTodoById(todoId: string) {
		const index = this.findTodoIndex(todoId);
		this.checkTodoByIndex(index, false);
	}

	@action deleteTodoById(todoId: string) {
		const index = this.findTodoIndex(todoId);
		const newValue = [...this.value];
		newValue.splice(index, 1);
		this.value = newValue;
	}

	private findTodoIndex(todoId: string) {
		return this.value.findIndex(({id}) => id === todoId)
	}

	private checkTodoByIndex(index: number, checked: boolean) {
		const newValue = [...this.value]
		newValue[index].checked = checked
		this.value = newValue;
	}
}
