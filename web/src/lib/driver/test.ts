import axios from 'axios'

interface ResponseDataType {
  text: string;
}

export class FetchError extends Error {}

export class TestDriver {
	async fetch() {
		const { status, data } = await axios.get<ResponseDataType>('http://localhost:4000/test')
		if (status === 202) {
			return data;
		}

		return new FetchError('Internal Server Error')
	}
}