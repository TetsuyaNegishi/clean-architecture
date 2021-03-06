import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Todo } from 'src/domain/Todo'
import { TodoUsecase } from 'src/usecase/Todo'

@Controller('v1/todo')
export class TodoController {
	constructor(private todoUsecase: TodoUsecase) {}

	@Get()
	async getAllTodo() {
		const todos = await this.todoUsecase.getAll()
		return {
			todoList: todos.map(({id, title, checked}) => {
				return {id, title, checked}
			})
		}
	}

	@Patch(":id")
	async patchTodo(@Param() params, @Body() body: Partial<Omit<Todo, 'id'>>) {
		const todo = await this.todoUsecase.update(params.id, body);
		return todo.toJson()
	}

	@Post()
	async postTodo(@Body() { title }: Partial<Omit<Omit<Todo, 'id'>, 'checked'>>) {
		const todo = await this.todoUsecase.create(title);
		return todo.toJson()
	}

	@Delete(":id")
	async deleteTodo(@Param() params) {
		const { id } = params
		this.todoUsecase.delete(id)
	}
}