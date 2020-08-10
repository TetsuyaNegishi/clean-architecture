import {InputTestPort, OutputTestPort} from '../port/test'

export class TestUsecase {
	constructor(private inputPort: InputTestPort, private outputPort: OutputTestPort,) {}

	async fetch() {
		const test = await this.inputPort.fetch();
		this.outputPort.store(test)
	}
}