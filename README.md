# Trello MCP Server

[![smithery badge](https://smithery.ai/badge/@LorhanSohaky/trello-mcp)](https://smithery.ai/server/@LorhanSohaky/trello-mcp)

A Model Context Protocol (MCP) server for interacting with the Trello API. This server enables AI assistants to retrieve information from Trello cards through a standardized interface.

## Features

- **Card Retrieval**: Get Trello cards by ID or direct link
- **Read-only Mode**: Optional read-only mode for safe operations
- **Type Safety**: Built with TypeScript and Zod for robust type validation
- **Debug Support**: Optional debug logging for troubleshooting

## Installation

### Prerequisites

- Node.js ≥ 22.7.0
- npm ≥ 10.8.2
- A Trello account with API access

### Installing via Smithery

To install Trello Integration Server automatically via [Smithery](https://smithery.ai/server/@LorhanSohaky/trello-mcp):

```bash
npx -y @smithery/cli install @LorhanSohaky/trello-mcp
```

### Setup

1. Clone the repository:
```bash
git clone https://github.com/LorhanSohaky/trello-mcp.git
cd trello-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Get your Trello API credentials:
   - Visit [Trello Developer API Keys](https://trello.com/app-key)
   - Copy your API Key
   - Generate a Token by clicking the "Token" link

## Configuration

The server requires the following configuration parameters:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `apiKey` | string | Yes | - | Your Trello API Key |
| `apiToken` | string | Yes | - | Your Trello API Token |
| `debug` | boolean | No | false | Enable debug logging |
| `readOnly` | boolean | No | false | Enable read-only mode |

### Example Configuration

```json
{
  "apiKey": "your_trello_api_key_here",
  "apiToken": "your_trello_api_token_here",
  "debug": false,
  "readOnly": true
}
```

## Available Tools

### `getCardById`

Retrieves a Trello card by its unique ID.

**Parameters:**
- `idCard` (string): The ID of the Trello card to retrieve

**Example:**
```json
{
  "tool": "getCardById",
  "input": { "idCard": "5f1a2b3c4d5e6f7g8h9i0j1k" }
}
```

### `getCardByLink`

Retrieves a Trello card using its public link.

**Parameters:**
- `link` (string): The URL of the Trello card to retrieve

**Example:**
```json
{
  "tool": "getCardByLink",
  "input": { "link": "https://trello.com/c/abc123def/123-card-title" }
}
```

## Development

This project uses [Smithery](https://smithery.ai/) for MCP server development and deployment.

### Running in Development Mode

```bash
npm run dev
```

This will start the MCP server using Smithery's development tools with hot reloading.

### Linting and Formatting

The project uses [Biome](https://biomejs.dev/) for linting and formatting:

```bash
# Format and fix linting issues
npm run lint:fix

# Check for linting issues only
npm run lint
```

### Project Structure

```
├── .editorconfig     # Editor configuration
├── .gitignore        # Git ignore rules
├── biome.json        # Biome linter/formatter config
├── lefthook.yaml     # Git hooks configuration
├── LICENSE.md        # MIT license
├── package.json      # Node.js dependencies and scripts
├── smithery.yaml     # Smithery MCP server configuration
├── README.md         # This file
└── src/
    ├── index.ts      # Main MCP server implementation
    └── trello/
        ├── index.ts  # Trello API client
        ├── cards.ts  # Cards API implementation
        └── schemas.ts # Zod schemas for type validation
```

## Usage with AI Assistants

This MCP server is designed to work with AI assistants that support the Model Context Protocol. Once configured, the assistant can use the provided tools to:

- Retrieve complete card information for project management tasks
- Get detailed card data when provided with Trello links
- Access all card properties including labels, members, due dates, and attachments
- Integrate Trello data into workflows and automation

## API Response Format

Both tools return the complete card object as JSON, containing all available card information including:

```json
{
  "id": "card_id_here",
  "name": "Card Title",
  "desc": "Card Description",
  "url": "https://trello.com/c/...",
  "shortLink": "abc123",
  "idBoard": "board_id",
  "idList": "list_id",
  "labels": [...],
  "members": [...],
  "due": "2025-01-01T00:00:00.000Z",
  // ... and many other properties
}
```

## Tools and Technologies

- **[Model Context Protocol (MCP)](https://modelcontextprotocol.io/)**: Standardized protocol for AI-tool integration
- **[Smithery](https://smithery.ai/)**: MCP server development and deployment platform
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript development
- **[Zod](https://zod.dev/)**: Runtime type validation and schema definition
- **[Biome](https://biomejs.dev/)**: Fast linter and formatter
- **[Lefthook](https://github.com/evilmartians/lefthook)**: Git hooks manager

## Error Handling

The server includes robust error handling for:
- Invalid card IDs
- Malformed Trello links
- API authentication failures
- Network connectivity issues

## Security

- The server supports read-only mode to prevent accidental modifications
- API credentials are required for all operations
- All inputs are validated using Zod schemas

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run linting: `npm run lint:fix`
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support

For issues and questions:
- Open an issue on [GitHub Issues](https://github.com/LorhanSohaky/trello-mcp/issues)
- Check the [repository homepage](https://github.com/LorhanSohaky/trello-mcp) for updates

---

*This MCP server is built using the [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) and follows MCP best practices for tool integration.*
