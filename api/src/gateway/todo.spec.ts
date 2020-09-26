import { TodoDriver } from "../driver/todo";
import { Todo } from "../domain/Todo";
import { TodoGateway } from "./todo";

describe('TodoGateway', () => {
	test('get', async () => {
		const driver = {} as TodoDriver;
		driver.findAll = jest.fn(async () => [
			{id: '1', title: 'title1', checked: false}
		])
		const target = new TodoGateway(driver);

		const actual = await target.getAll();
		const expected = [new Todo('1', 'title1', false)]

		expect(actual).toEqual(expected)
	})
})