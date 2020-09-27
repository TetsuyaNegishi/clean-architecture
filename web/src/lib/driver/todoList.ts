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

const API_URL = 'http://localhost:4000'

export class TodoListDriver {
	async fetch() {
		const { status, data } = await axios.get<FetchResponseDataType>(`${API_URL}/v1/todo`)
		if (status <= 400) {
			return data;
		}

		return new FetchError('Internal Server Error')
	}

	async post(title: string): Promise<TodoValueType> {
		const { data } = await axios.post<TodoValueType>(`${API_URL}/v1/todo`, { title })
		return data
	}

	async patch(todoId: string, patchBody: Partial<TodoValueType>) {
		const { data } = await axios.patch<TodoValueType>(`${API_URL}/v1/todo/${todoId}`, patchBody);
		return data
	}

	async delete(todoId: string) {
		await axios.delete(`${API_URL}/v1/todo/${todoId}`)
	}
}