export class Todo {
	constructor(readonly id: string, readonly title: string, readonly checked: boolean) {}
}

export type Todos = Todo[];
