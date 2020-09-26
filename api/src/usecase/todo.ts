import { Injectable } from "@nestjs/common";
import { TodoPort } from "../port/todo";

@Injectable()
export class TodoUsecase {
	constructor(private readonly todoPort: TodoPort) {}

	async getAll() {
		return await this.todoPort.getAll()
	}
}
