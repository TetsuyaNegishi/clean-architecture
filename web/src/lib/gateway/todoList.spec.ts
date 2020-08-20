import { Todo } from "../domain/todo"
import { TodoListDriver } from '../driver/todoList'
import { TodoListGateway } from "./todoList"

jest.mock('../driver/todoList');
const TodoListDriverMock = TodoListDriver as jest.Mock;

describe('TodoListGateway', () => {
	it('fetch success', async () => {
		TodoListDriverMock.mockImplementationOnce(() => {
      return {
        fetch: async () => {
          return {
						todoList: [
							{
								"title": "title1"
							},
							{
								"title": "title2"
							}
						]
					};
        },
      };
    })

		const expected = [new Todo('title1'), new Todo('title2')]

		const gateway = new TodoListGateway(new TodoListDriver())
		const actual = await gateway.fetch()

		expect(actual).toEqual(expected)
	})

	it('fail to fetch', async () => {
		TodoListDriverMock.mockImplementationOnce(() => {
			return {
				fetch: async () => {
					return new Error()
				}
			}
		})

		const gateway = new TodoListGateway(new TodoListDriver())
    const actual = await gateway.fetch();

    expect(actual instanceof Error).toBe(true)
	})
})