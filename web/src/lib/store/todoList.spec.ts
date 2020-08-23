import { TodoListStore } from './todoList'
import { Todo } from '../domain/todo'

describe('TodoListStore', () => {
	it('store', async () => {
		const store = new TodoListStore()

		store.setTodoList([new Todo('title1', true), new Todo('title2', false)])

		const expected = [{title: 'title1', checked: true}, {title: 'title2', checked: false}]
		const actual = store.value

		expect(actual).toEqual(expected)
	})
})