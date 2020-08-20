import React, { useEffect } from 'react'
import { useObserver } from "mobx-react-lite"
import { StoreContext, TodoListUsecaseContext } from './Provider'
import {TodoList} from '../../component/organisms/TodoList'

export const TodoListPage: React.FC = () => {
	const store = React.useContext(StoreContext)
  const todoListUsecase = React.useContext(TodoListUsecaseContext)

	useEffect(() => {
    todoListUsecase.fetch();
  }, [todoListUsecase])

	return useObserver(() => {
		return <TodoList todoList={store.todoList}/>
	})
}
