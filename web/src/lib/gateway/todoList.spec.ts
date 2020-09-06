import { Todo } from "../domain/todo"
import { TodoListDriver } from '../driver/todoList'
import { TodoListGateway } from "./todoList"

jest.mock('../driver/todoList');
const TodoListDriverMock = TodoListDriver as jest.Mock;

describe('TodoListGateway', () => {
	test('fetch success', async () => {
		TodoListDriverMock.mockImplementationOnce(() => {
      return {
        fetch: async () => {
          return {
						todoList: [
							{
								"id": "id1",
								"title": "title1",
								"checked": true
							},
							{
								"id": "id2",
								"title": "title2",
								"checked": false
							}
						]
					};
        },
      };
    })

		const expected = [new Todo('id1', 'title1', true), new Todo('id2', 'title2', false)]

		const gateway = new TodoListGateway(new TodoListDriver())
		const actual = await gateway.fetch()

		expect(actual).toEqual(expected)
	})

	test('fail to fetch', async () => {
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

	test('post success', async () => {
		const title = "title"

		const driver = {} as TodoListDriver;
		const postFunc = jest.fn(async () => ({id: "id", title: "title", checked: false}))
		driver.post = postFunc
		const gateway = new TodoListGateway(driver)

		const actual = await gateway.post(title);
		const expected = new Todo("id", "title", false);

		expect(actual).toEqual(expected)
		expect(postFunc).toBeCalledWith(title)
	})
})