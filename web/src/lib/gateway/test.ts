import {TestDriver} from '../driver/test'
import {InputTestPort} from '../port/test'
import {Test} from '../domain/test'

export class TestGateway implements InputTestPort{
	constructor(private driver: TestDriver){}
	async fetch() {
		const {text} = await this.driver.fetch()
		const testDomain = new Test(text)
		return testDomain
	}
}