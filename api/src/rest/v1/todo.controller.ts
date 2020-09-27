import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
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
}