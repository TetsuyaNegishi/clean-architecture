import { Todo } from "../domain/Todo";
import { TodoPort } from "../port/todo";
import { TodoUsecase } from "./Todo";

describe('TodoUsecase', () => {
	test('すべてのtodoリストを取得する', async () => {
		const todoGateway = {} as TodoPort;
		todoGateway.getAll = jest.fn(async () => [
			new Todo('1', 'title', false)
		])
		const target = new TodoUsecase(todoGateway);

		const actual = await target.getAll();
		const expected = [new Todo('1', 'title', false)]
		expect(actual).toEqual(expected)
	})

	test("todoを更新する", async () => {
		const todoId = '1'
		const todoObject = { title: 'newTitle', checked: true }

		const beforeTodo = new Todo('1', 'title', false)
		const afterTodo = new Todo('1', 'newTitle', true)

		jest.spyOn(beforeTodo, 'updateTitle').mockImplementationOnce(() => new Todo('1', 'newTitle', false))
		jest.spyOn(beforeTodo, 'check').mockImplementationOnce(() => afterTodo)

		const todoGateway = {} as TodoPort;
		const getFunc = jest.fn(async () => beforeTodo)
		todoGateway.get = getFunc
		const updateFunc = jest.fn()
		todoGateway.update = updateFunc
		const target = new TodoUsecase(todoGateway);

		const actual = await target.update(todoId, todoObject)

		const expected = new Todo('1', 'newTitle', true)

		expect(actual).toEqual(expected)

		expect(getFunc).toBeCalled()
		expect(updateFunc).toBeCalledWith(afterTodo)
	})

	test("todoを作成する", async () => {
		const title = 'title'
		const newTodo = new Todo('1', 'title', false)

		const todoGateway = {} as TodoPort;
		const createFunc = jest.fn(async () => newTodo)
		todoGateway.create = createFunc
		const target = new TodoUsecase(todoGateway);

		const actual = await target.create(title);
		const expected = new Todo("1", "title", false);

		expect(actual).toEqual(expected)

		expect(createFunc).toBeCalledWith(title)
	})

	test("todoを削除する", async () => {
		const todoId = '1'

		const todoGateway = {} as TodoPort
		const deleteFunc = jest.fn()
		todoGateway.delete = deleteFunc
		const target = new TodoUsecase(todoGateway);

		await target.delete(todoId);

		expect(deleteFunc).toBeCalledWith(todoId)
	})
})
