import React from 'react'
import { List, ListItem, ListItemText, Radio } from '@material-ui/core';

interface Props {
	todoList: {
		id: string;
		checked: boolean;
		title: string;
	}[];
	onCheckTodo: (id: string) => void;
	onUnCheckTodo: (id: string) => void;
}
export const TodoList: React.FC<Props> = ({ todoList, onCheckTodo, onUnCheckTodo }) => {
	return (
		<List>
			{todoList.map(({ id, title, checked }) => {
				return (
					<ListItem data-testid="todo-item" key={id}>
						<Radio data-testid="todo-checkbox" checked={checked} onClick={() => checked ? onUnCheckTodo(id) : onCheckTodo(id)} />
							<ListItemText data-testid="todo-title" style={checked ? {textDecoration: 'line-through'} : undefined} primary={title} />
					</ListItem>
				)
			})}
		</List>
	)
}