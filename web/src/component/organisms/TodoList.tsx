import React from 'react'
import { List, ListItem, ListItemText, Radio, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
	todoList: {
		id: string;
		checked: boolean;
		title: string;
	}[];
	onCheckTodo: (id: string) => void;
	onUnCheckTodo: (id: string) => void;
	onDeleteTodo: (id: string) => void;
}
export const TodoList: React.FC<Props> = ({ todoList, onCheckTodo, onUnCheckTodo, onDeleteTodo }) => {
	return (
		<List>
			{todoList.map(({ id, title, checked }) => {
				return (
					<ListItem data-testid="todo-item" key={id}>
						<Radio data-testid="todo-checkbox" checked={checked} onClick={() => checked ? onUnCheckTodo(id) : onCheckTodo(id)} />
						<ListItemText data-testid="todo-title" style={checked ? {textDecoration: 'line-through'} : undefined} primary={title} />
            <IconButton data-testid="todo-delete-button" onClick={() => onDeleteTodo(id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
					</ListItem>
				)
			})}
		</List>
	)
}