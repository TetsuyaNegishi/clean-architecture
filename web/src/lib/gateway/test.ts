import { TestDriver } from '../driver/test'
import {InputTestPort} from '../port/test'
import {Test} from '../domain/test'

export class DriverFetchError extends Error {}

export class TestGateway implements InputTestPort{
	constructor(private driver: TestDriver){}
	async fetch() {
		const response = await this.driver.fetch()
		if (response instanceof Error) {
			return new DriverFetchError();
		}

		const { text } = response;
		const testDomain = new Test(text)
		return testDomain
	}
}
