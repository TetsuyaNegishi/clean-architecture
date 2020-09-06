import { TodoListStore } from './todoList'
import { Todo } from '../domain/todo'

describe('TodoListStore', () => {
	it('store', () => {
		const store = new TodoListStore()

		store.setTodoList([new Todo('id1', 'title1', true), new Todo('id2', 'title2', false)])

		const expected = [{id: 'id1', title: 'title1', checked: true}, {id: 'id2', title: 'title2', checked: false}]
		const actual = store.value

		expect(actual).toEqual(expected)
	})

	it('check', () => {
		const todoId = "id2"

		const store = new TodoListStore()
		store.setTodoList([new Todo('id1', 'title1', true), new Todo('id2', 'title2', false)])

		store.checkTodoById(todoId)

		const expected = [{id: 'id1', title: 'title1', checked: true}, {id: 'id2', title: 'title2', checked: true}]
		const actual = store.value

		expect(actual).toEqual(expected)
	})

	it('uncheck', () => {
		const todoId = "id1"

		const store = new TodoListStore()
		store.setTodoList([new Todo('id1', 'title1', true), new Todo('id2', 'title2', false)])

		store.uncheckTodoById(todoId)

		const expected = [{id: 'id1', title: 'title1', checked: false}, {id: 'id2', title: 'title2', checked: false}]
		const actual = store.value

		expect(actual).toEqual(expected)
	})

	it('delete', () => {
		const todoId = "id1"

		const store = new TodoListStore()
		store.setTodoList([new Todo('id1', 'title1', true), new Todo('id2', 'title2', false)])

		store.deleteTodoById(todoId)

		const expected = [{id: 'id2', title: 'title2', checked: false}]
		const actual = store.value

		expect(actual).toEqual(expected)
	})
})
