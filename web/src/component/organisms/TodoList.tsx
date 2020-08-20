import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core';

interface Props {
	todoList: {
		title: string
	}[]
}
export const TodoList: React.FC<Props> = ({ todoList }) => {
	return (
		<List>
			{todoList.map(({ title }, id) => {
				return <ListItem><ListItemText key={id} data-testid="todo-title" primary={title} /></ListItem>
			})}
		</List>
	)
}