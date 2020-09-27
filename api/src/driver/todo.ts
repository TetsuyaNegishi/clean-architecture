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

	async find(id: string): Promise<TodoJson> {
		const todo = await database.query<TodoJson>(`select * from todo where id = ${id}`)
		return todo.rows[0]
	}

	async update({id, title, checked}: TodoJson): Promise<void> {
		await database.query(`update todo set title = '${title}', checked = ${checked} where id = ${id}`)
	}

	async create({title, checked}: Omit<TodoJson, 'id'>) {
		const response = await database.query<{id: string, title: string, checked: boolean}>(`insert into todo(title, checked) values('${title}', ${checked}) returning id, title, checked`)
		return response.rows[0]
	}
}
