export class Todo {
	constructor(readonly id: string, private _title: string, private _checked: boolean) {}

	get title() {
		return this._title
	}

	get checked() {
		return this._checked
	}

	updateTitle(title: string) {
		this._title = title;
		return this;
	}

	check() {
		this._checked = true;
		return this;
	}

	uncheck() {
		this._checked = false;
		return this;
	}
}

export type Todos = Todo[];
