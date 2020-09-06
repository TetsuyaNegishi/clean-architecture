import axios from 'axios'

export interface TodoValueType {
	id: string;
	title: string;
	checked: boolean;
}

interface FetchResponseDataType {
  todoList: TodoValueType[];
}

export class FetchError extends Error {}

export class TodoListDriver {
	async fetch() {
		const { status, data } = await axios.get<FetchResponseDataType>('http://localhost:4000/v1/todo-list')
		if (status <= 400) {
			return data;
		}

		return new FetchError('Internal Server Error')
	}

	async post(title: string): Promise<TodoValueType> {
		const { data } = await axios.post<TodoValueType>('http://localhost:4000/v1/todo-list', { title })
		return data
	}
}