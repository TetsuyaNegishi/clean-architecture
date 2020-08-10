import axios from 'axios'

interface ResponseDataType {
  text: string;
}

export class TestDriver {
	async fetch() {
		const { data } = await axios.get<ResponseDataType>('http://localhost:4000/test')
		return data;
	}
}