import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {z} from 'zod';
import {TrelloApi} from './trello';

export const configSchema = z.object({
	debug: z.boolean().default(false).describe('Enable debug logging'),
	apiKey: z.string().describe('Trello API Key'),
	apiToken: z.string().describe('Trello API Token'),
	readOnly: z.boolean().default(false).describe('Enable read-only mode'),
});

export default function createStatelessServer({config}: {config: z.infer<typeof configSchema>}) {
	const trello = new TrelloApi({
		apiKey: config.apiKey,
		apiToken: config.apiToken,
	});

	const server = new McpServer({
		name: 'trello-mcp',
		description: 'A Model Context Protocol server for Trello',
		version: '0.0.1',
		title: 'Trello MCP Server',
	});

	server.tool(
		'getCardById',
		'Get a Trello card by its ID',
		{
			idCard: z.string().describe('The ID of the Trello card to retrieve'),
		},
		async ({idCard}) => {
			const card = await trello.cards.getCard(idCard);
			return {
				content: [{type: 'text', text: JSON.stringify(card)}],
			};
		},
	);

	server.tool(
		'getCardByLink',
		'Get a Trello card by its link',
		{
			link: z.string().url().describe('The link of the Trello card to retrieve'),
		},
		async ({link}) => {
			const cardId = link.split('/')[4];
			if (!cardId) {
				throw new Error('Invalid Trello card link');
			}

			const card = await trello.cards.getCard(cardId);
			return {
				content: [{type: 'text', text: JSON.stringify(card)}],
			};
		},
	);

	return server.server;
}
