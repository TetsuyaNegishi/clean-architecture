import { TestStore } from './test'

describe('TestStore', () => {
	it('success to store', async () => {
		const store = new TestStore()

		store.setText('test')

		const expected = 'test'
		const actual = store.text

		expect(actual).toBe(expected)
	})
})
