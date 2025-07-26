import {TrelloCardsApi} from './cards';

const BASE_URL = 'https://api.trello.com/1';

export class TrelloApi {
	private _cards: TrelloCardsApi;

	constructor({apiKey, apiToken}: {apiKey: string; apiToken: string}) {
		this._cards = new TrelloCardsApi({
			baseUrl: BASE_URL,
			apiKey,
			apiToken,
		});
	}

	get cards() {
		return this._cards;
	}
}
