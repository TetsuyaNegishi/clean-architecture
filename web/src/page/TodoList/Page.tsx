import React, { useEffect, useCallback } from 'react'
import { useObserver } from "mobx-react-lite"
import { StoreContext, TodoListUsecaseContext } from './Provider'
import {TodoList} from '../../component/organisms/TodoList'

export const TodoListPage: React.FC = () => {
	const store = React.useContext(StoreContext)
  const todoListUsecase = React.useContext(TodoListUsecaseContext)

	useEffect(() => {
    todoListUsecase.fetch();
	}, [todoListUsecase])

	const handleOnCheckTodo = useCallback((id: string) => {
		todoListUsecase.check(id)
	}, [todoListUsecase])

	const handleOnUnCheckTodo = useCallback((id: string) => {
		todoListUsecase.uncheck(id)
	}, [todoListUsecase])

	const handleOnDeleteTodo = useCallback((id: string) => {
		todoListUsecase.delete(id)
	}, [todoListUsecase])

	return useObserver(() => {
		return <TodoList todoList={store.value} onCheckTodo={handleOnCheckTodo} onUnCheckTodo={handleOnUnCheckTodo} onDeleteTodo={handleOnDeleteTodo} />
	})
}
