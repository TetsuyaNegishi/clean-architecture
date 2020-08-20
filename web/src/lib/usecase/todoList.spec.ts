import { InputTodoListPort, OutputTodoListPort } from "../port/todoList"
import { Todo } from "../domain/todo"
import { TodoListUsecase } from '../usecase/todoList'

describe('TodoListUsecase', () => {
	test('fetch success', async () => {
		const fechFunctionMock = jest.fn(async () => {
			const todoList = [new Todo('title1'), new Todo('title2')]
			return todoList
		})
		const InputPortMock = jest.fn<InputTodoListPort, []>().mockImplementationOnce(() => {
			return {
				fetch: fechFunctionMock
			}
		})

		const storeFunctionMock = jest.fn(async (todoList: Todo[] ) => {})
		const OutputPortMock = jest.fn<OutputTodoListPort, []>().mockImplementationOnce(() => {
			return {
				storeTodoList: storeFunctionMock
			}
		})

		const gateway = new InputPortMock()
		const store = new OutputPortMock()
		const usecase = new TodoListUsecase(gateway, store)

		await usecase.fetch();

		expect(fechFunctionMock).toBeCalled();
		expect(storeFunctionMock).toBeCalled();
	})

	test('faild to fetch', async () => {
		const fechFunctionMock = jest.fn(async () => {
			return new Error()
		})
		const InputPortMock = jest.fn<InputTodoListPort, []>().mockImplementationOnce(() => {
			return {
				fetch: fechFunctionMock
			}
		})

		const storeFunctionMock = jest.fn(async (todoList: Todo[] ) => {})
		const OutputPortMock = jest.fn<OutputTodoListPort, []>().mockImplementationOnce(() => {
			return {
				storeTodoList: storeFunctionMock
			}
		})

		const gateway = new InputPortMock()
		const store = new OutputPortMock()
		const usecase = new TodoListUsecase(gateway, store)

		await usecase.fetch();

		expect(fechFunctionMock).toBeCalled();
		expect(storeFunctionMock).not.toBeCalled();
	})
})
