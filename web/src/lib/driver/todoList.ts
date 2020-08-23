import axios from 'axios'

interface ResponseTodoType {
	title: string;
}

interface ResponseDataType {
  todoList: ResponseTodoType[];
}

export class FetchError extends Error {}

export class TodoListDriver {
	async fetch() {
		const { status, data } = await axios.get<ResponseDataType>('http://localhost:4000/v1/todo-list')
		if (status <= 400) {
			return data;
		}

		return new FetchError('Internal Server Error')
	}
}