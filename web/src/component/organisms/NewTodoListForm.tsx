import React, { useRef, useCallback } from 'react'
import { Input, Button } from '@material-ui/core'

interface Props {
	onSubmit: (title: string) => void;
}

export const NewTodoListForm: React.FC<Props> = ({ onSubmit }) => {
	const titleInputRef = useRef<HTMLInputElement>(null)

	const handleOnSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();

		const title = titleInputRef.current?.value;
		if (!title) {
			return
		}

		onSubmit(title)
	}, [titleInputRef, onSubmit])

	return (
		<form style={{display: "flex"}} onSubmit={handleOnSubmit}>
			<Input data-testid="todo-title-input-field" style={{flex: '1'}} inputRef={titleInputRef} />
			<Button data-testid="add-todo-button" variant="contained" color="primary" type="submit">+</Button>
		</form>
	)
}
