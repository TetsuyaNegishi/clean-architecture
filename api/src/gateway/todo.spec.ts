import { TodoDriver } from "../driver/todo";
import { Todo } from "../domain/Todo";
import { TodoGateway } from "./todo";

describe('TodoGateway', () => {
	test('getAll', async () => {
		const driver = {} as TodoDriver;
		driver.findAll = jest.fn(async () => [
			{id: '1', title: 'title1', checked: false}
		])
		const target = new TodoGateway(driver);

		const actual = await target.getAll();
		const expected = [new Todo('1', 'title1', false)]

		expect(actual).toEqual(expected)
	})

	test('get', async () => {
		const todoId = '1'

		const driver = {} as TodoDriver;
		const findFunc = jest.fn(async () =>
			({id: '1', title: 'title1', checked: false})
		)
		driver.find = findFunc

		const target = new TodoGateway(driver);

		const actual = await target.get(todoId);
		const expected = new Todo('1', 'title1', false)

		expect(actual).toEqual(expected)

		expect(findFunc).toBeCalledWith(todoId)
	})

	test('update', async () => {
		const todo = new Todo('id', 'title', false)
		const todoJson = {
			id: 'id',
			title: 'title',
			checked: false,
		}

		const driver = {} as TodoDriver;
		const updateFunc = jest.fn();
		driver.update = updateFunc
		const target = new TodoGateway(driver);

		const actual = await target.update(todo);
		const expected = todo;

		expect(actual).toEqual(expected)

		expect(updateFunc).toBeCalledWith(todoJson)
	})

	test('create', async () => {
		const title = 'title';
		const newTodoJson = {
			id: '1',
			title: 'title',
			checked: false
		}

		const driver = {} as TodoDriver
		const createFunc = jest.fn(async () => newTodoJson);
		driver.create = createFunc
		const target = new TodoGateway(driver);

		const actual = await target.create(title)
		const expected = new Todo('1', 'title', false)

		expect(actual).toEqual(expected)

		expect(createFunc).toBeCalledWith({ title, checked: false })
	})
})
