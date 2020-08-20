export class TodoListDriver {
	async fetch() {
		return {
			todoList: [
				{
					"title": "タイトル1"
				},
				{
					"title": "タイトル2"
				},
				{
					"title": "タイトル3"
				}
			]
		}
	}
}