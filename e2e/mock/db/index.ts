import {getTodoList, postTodo} from './todo-list'

const mergedJson = {
	"todo-list": getTodoList,
	"todo-list_post": postTodo,
}

export default mergedJson
