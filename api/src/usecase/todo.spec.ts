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
})
