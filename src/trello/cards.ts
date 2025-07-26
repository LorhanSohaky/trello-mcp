import axios, {type AxiosInstance} from 'axios';
import {Card} from './schemas';

export class TrelloCardsApi {
	private client: AxiosInstance;

	constructor({baseUrl, apiKey, apiToken}: {baseUrl: string; apiKey: string; apiToken: string}) {
		this.client = axios.create({
			baseURL: `${baseUrl}/cards`,
			params: {
				key: apiKey,
				token: apiToken,
			},
		});
	}

	async getCard(idCard: string) {
		const {data} = await this.client.get(`/${idCard}`);
		return Card.parse(data);
	}
}
