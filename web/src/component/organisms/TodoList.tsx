import React from 'react'
import { List, ListItem, ListItemText, Radio } from '@material-ui/core';

interface Props {
	todoList: {
		checked: boolean;
		title: string;
	}[]
}
export const TodoList: React.FC<Props> = ({ todoList }) => {
	return (
		<List>
			{todoList.map(({ title, checked }, id) => {
				return (
					<ListItem key={id}>
						<Radio data-testid="todo-checkbox" checked={checked} /><ListItemText data-testid="todo-title" primary={title} />
					</ListItem>
				)
			})}
		</List>
	)
}