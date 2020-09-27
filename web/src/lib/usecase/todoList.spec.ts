import { TodoListPort, OutputTodoListPort } from "../port/todoList"
import { Todo } from "../domain/todo"
import { TodoListUsecase } from '../usecase/todoList'

describe('TodoListUsecase', () => {
	test('fetch success', async () => {
		const todoList = [new Todo('id1', 'title1', false), new Todo('id2', 'title2', true)]

		const gateway = {} as TodoListPort;
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
		const gateway = {} as TodoListPort;
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

		const gateway = {} as TodoListPort;
		const gatewayCheckFunc = jest.fn(async () => ({} as Todo));
		gateway.check = gatewayCheckFunc;
		const store = {} as OutputTodoListPort;
		const storeCheckFunc = jest.fn();
		store.checkTodoById = storeCheckFunc;
		const usecase = new TodoListUsecase(gateway, store)

		usecase.check(todoId);

		expect(gatewayCheckFunc).toBeCalledWith(todoId)
		expect(storeCheckFunc).toBeCalledWith(todoId)
	})

	test("uncheck success", () => {
		const todoId = "id";

		const gateway = {} as TodoListPort;
		const gatewayUncheckFunc = jest.fn(async () => ({} as Todo));
		gateway.uncheck = gatewayUncheckFunc;
		const store = {} as OutputTodoListPort;
		const uncheckFunc = jest.fn();
		store.uncheckTodoById = uncheckFunc;
		const usecase = new TodoListUsecase(gateway, store)

		usecase.uncheck(todoId);
		expect(gatewayUncheckFunc).toBeCalledWith(todoId)
		expect(uncheckFunc).toBeCalledWith(todoId)
	})

	test("delete success", () => {
		const todoId = "id";

		const gateway = {} as TodoListPort;
		const deleteFunc = jest.fn()
		gateway.delete = deleteFunc
		const store = {} as OutputTodoListPort;
		const deleteTodoByIdFunc = jest.fn();
		store.deleteTodoById = deleteTodoByIdFunc;
		const usecase = new TodoListUsecase(gateway, store)

		usecase.delete(todoId);

		expect(deleteFunc).toBeCalledWith(todoId)
		expect(deleteTodoByIdFunc).toBeCalledWith(todoId)
	})

	test("create success", async () => {
		const todoTitle = 'title'
		const newTodo = new Todo("id", "title", false);

		const gateway = {} as TodoListPort;
		const postFunc = jest.fn(async () => newTodo);
		gateway.post = postFunc
		const store = {} as OutputTodoListPort;
		const addFunc = jest.fn();
		store.addTodo = addFunc;
		const usecase = new TodoListUsecase(gateway, store)

		await usecase.create(todoTitle);

		expect(postFunc).toBeCalledWith(todoTitle)
		expect(addFunc).toBeCalledWith(newTodo)
	})

})
