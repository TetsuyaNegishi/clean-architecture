import {observable, action} from 'mobx'
import {OutputTestPort} from '../port/test'
import {Test} from '../domain/test'

export class TestStore implements OutputTestPort {
	@observable text: string = '';

	@action setText(text: string) {
		this.text = text
	}

	store(data: Test) {
		const {text} = data
		this.setText(text)
	}
}
