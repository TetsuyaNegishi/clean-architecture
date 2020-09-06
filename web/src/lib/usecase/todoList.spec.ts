import { InputTodoListPort, OutputTodoListPort } from "../port/todoList"
import { Todo } from "../domain/todo"
import { TodoListUsecase } from '../usecase/todoList'

describe('TodoListUsecase', () => {
	test('fetch success', async () => {
		const todoList = [new Todo('id1', 'title1', false), new Todo('id2', 'title2', true)]

		const gateway = {} as InputTodoListPort;
		const fetchFunc = jest.fn(async () => todoList);
		gateway.fetch = fetchFunc;
		const store = {} as OutputTodoListPort;
		const storeTodoListFunc = jest.fn();
		store.storeTodoList = storeTodoListFunc

		const usecase = new TodoListUsecase(gateway, store)

		await usecase.fetch();

		expect(fetchFunc).toBeCalled();
		expect(storeTodoListFunc).toBeCalledWith(todoList);
	})

	test('faild to fetch', async () => {
		const gateway = {} as InputTodoListPort;
		const fetchFunc = jest.fn(async () => new Error());
		gateway.fetch = fetchFunc;
		const store = {} as OutputTodoListPort;
		const storeTodoListFunc = jest.fn();
		store.storeTodoList = storeTodoListFunc

		const usecase = new TodoListUsecase(gateway, store)

		await usecase.fetch();

		expect(fetchFunc).toBeCalled();
		expect(storeTodoListFunc).not.toBeCalled();
	})

	test("check success", () => {
		const todoId = "id";

		const gateway = {} as InputTodoListPort;
		const store = {} as OutputTodoListPort;
		const checkFunc = jest.fn();
		store.checkTodoById = checkFunc;
		const usecase = new TodoListUsecase(gateway, store)

		usecase.check(todoId);

		expect(checkFunc).toBeCalledWith(todoId)
	})

	test("uncheck success", () => {
		const todoId = "id";

		const gateway = {} as InputTodoListPort;
		const store = {} as OutputTodoListPort;
		const uncheckFunc = jest.fn();
		store.uncheckTodoById = uncheckFunc;
		const usecase = new TodoListUsecase(gateway, store)

		usecase.uncheck(todoId);
		expect(uncheckFunc).toBeCalledWith(todoId)
	})

	test("delete success", () => {
		const todoId = "id";

		const gateway = {} as InputTodoListPort;
		const store = {} as OutputTodoListPort;
		const deleteFunc = jest.fn();
		store.deleteTodoById = deleteFunc;
		const usecase = new TodoListUsecase(gateway, store)

		usecase.delete(todoId);
		expect(deleteFunc).toBeCalledWith(todoId)
	})
})
