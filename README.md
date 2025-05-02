# Bleep API

Bleep API is a collaborative tool that lets large groups of people send musical notes to a MIDI device. Notes are sent via an API where they get published as a stream of Server-sent events.

## Components

### Server
- Built with Deno
- REST API for notes submission
- Redis pub/sub for real-time communication
- Server-Sent Events (SSE) stream
- Static file serving

### Client
- API docs (/public/docs/)
- MIDI Player client
- Music Score visualization

## Development

1. Use Dev Container
2. Configure environment (create a `.env` file):
   ```
   ENDPOINT=your-redis-host
   PORT=your-redis-port
   PASSWORD=your-redis-password
   ```

### Run the Server
```bash
deno task dev
```

## API Endpoints
- `GET /stream`: Subscribe to note events (SSE)
- `GET /:channel/:note?duration=<ms>`: Trigger a note
- `GET /color`: Get/cycle colors
- `GET /public/*`: Static files

## Testing
- Run tests: `deno test`
- Traffic simulation: `deno run --allow-all test/traffic-simulation.ts`

## Production
```bash
deno run --allow-all main.ts
```
