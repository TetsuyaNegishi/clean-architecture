import {Test} from '../domain/test'

export interface InputTestPort {
	fetch: () => Promise<Test | Error>
}

export interface OutputTestPort {
	store: (data: Test) => void
}
