import { Controller, Get } from '@nestjs/common'
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
}