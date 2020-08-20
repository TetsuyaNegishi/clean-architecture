import { TestUsecase } from './test'
import { InputTestPort, OutputTestPort } from '../port/test'
import { Test } from '../domain/test'

describe('TestUsecase', () => {
	it('fetch success', async () => {
		const fechFunctionMock = jest.fn(async () => {
			return new Test('test')
		})
		const InputPortMock = jest.fn<InputTestPort, []>().mockImplementationOnce(() => {
			return {
				fetch: fechFunctionMock
			}
		})

		const storeFunctionMock = jest.fn(async (data: Test) => {})
		const OutputPortMock = jest.fn<OutputTestPort, []>().mockImplementationOnce(() => {
			return {
				store: storeFunctionMock
			}
		})

		const gateway = new InputPortMock()
		const store = new OutputPortMock()
		const usecase = new TestUsecase(gateway, store)

		await usecase.fetch();

		expect(fechFunctionMock).toBeCalled();
		expect(storeFunctionMock).toBeCalled();
	})

	it('fail to fetch', async () => {
		const fechFunctionMock = jest.fn(async () => {
			return new Error()
		})
		const InputPortMock = jest.fn<InputTestPort, []>().mockImplementationOnce(() => {
			return {
				fetch: fechFunctionMock
			}
		})

		const storeFunctionMock = jest.fn(async (data: Test) => {})
		const OutputPortMock = jest.fn<OutputTestPort, []>().mockImplementationOnce(() => {
			return {
				store: storeFunctionMock
			}
		})

		const gateway = new InputPortMock()
		const store = new OutputPortMock()
		const usecase = new TestUsecase(gateway, store)

		await usecase.fetch();

		expect(fechFunctionMock).toBeCalled();
		expect(storeFunctionMock).not.toBeCalled();
	})
})