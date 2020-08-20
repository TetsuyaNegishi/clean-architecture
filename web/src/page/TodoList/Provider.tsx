import React from 'react'

const store = {
	todoList: [
		{ title: 'タイトル1' },
		{ title: 'タイトル2' },
		{ title: 'タイトル3' },
	]
}

const todoListUsecase = {
	fetch: () => {}
}

export const StoreContext = React.createContext<typeof store>(store);
export const TodoListUsecaseContext = React.createContext<typeof todoListUsecase>(todoListUsecase);

export const Provider: React.FC = ({children}) => (
	<StoreContext.Provider value={store}>
		<TodoListUsecaseContext.Provider value={todoListUsecase}>
			{children}
		</TodoListUsecaseContext.Provider>
	</StoreContext.Provider>
)
