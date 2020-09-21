import { Module } from '@nestjs/common';
import { TodoDriver } from 'src/driver/todo';
import { TodoGateway } from 'src/gateway/todo';
import { TodoPort } from 'src/port/todo';
import { TodoUsecase } from 'src/usecase/Todo';
import {TodoController} from './todo.controller';

@Module({
	providers: [
		TodoUsecase,
		{
			provide: TodoPort,
			useClass: TodoGateway
		},
		TodoDriver
	],
	controllers: [TodoController]
})
export class TodoModule {}
