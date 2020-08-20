import React from 'react'
import { TodoListUsecase } from '../../lib/usecase/todoList'
import { TodoListGateway } from '../../lib/gateway/todoList'
import { TodoListDriver } from '../../lib/driver/todoList'
import { TodoListStore } from '../../lib/store/todoList'

const store = new TodoListStore();
const driver = new TodoListDriver();
const gateway = new TodoListGateway(driver);
const todoListUsecase = new TodoListUsecase(gateway, store)

export const StoreContext = React.createContext<typeof store>(store);
export const TodoListUsecaseContext = React.createContext<typeof todoListUsecase>(todoListUsecase);

export const Provider: React.FC = ({children}) => (
	<StoreContext.Provider value={store}>
		<TodoListUsecaseContext.Provider value={todoListUsecase}>
			{children}
		</TodoListUsecaseContext.Provider>
	</StoreContext.Provider>
)
