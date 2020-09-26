import { Injectable } from '@nestjs/common';
import { Pool } from 'pg'

const database = new Pool({
	user: 'dev',
	password: 'password',
	host: 'localhost',
	database: 'todo-list',
	port: 5432,
})

interface TodoJson {
	id: string;
	title: string;
	checked: boolean;
}

@Injectable()
export class TodoDriver {
	async findAll(): Promise<TodoJson[]> {
		const todos = await database.query<TodoJson>("select * from todo order by id");
		return todos.rows;
	}
}
