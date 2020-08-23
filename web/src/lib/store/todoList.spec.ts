import { TodoListStore } from './todoList'
import { Todo } from '../domain/todo'

describe('TodoListStore', () => {
	it('store', async () => {
		const store = new TodoListStore()

		store.setTodoList([new Todo('title1'), new Todo('title2')])

		const expected = [new Todo('title1'), new Todo('title2')]
		const actual = store.value

		expect(actual).toEqual(expected)
	})
})