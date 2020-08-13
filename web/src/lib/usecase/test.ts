import {InputTestPort, OutputTestPort} from '../port/test'

export class InputPortError extends Error {}

export class TestUsecase {
	constructor(private inputPort: InputTestPort, private outputPort: OutputTestPort,) {}

	async fetch() {
		const inputData = await this.inputPort.fetch();
		if(inputData instanceof Error) {
			console.error('input port error')
			return
		}

		this.outputPort.store(inputData)
	}
}