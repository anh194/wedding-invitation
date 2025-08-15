# Wedding Backend API

A robust Express.js TypeScript backend for the wedding invitation system with PostgreSQL database.

## Features

- ✅ **TypeScript** - Full type safety
- ✅ **PostgreSQL** - Reliable database with UUID primary keys
- ✅ **Request Logging** - All requests are logged for debugging
- ✅ **Input Validation** - Comprehensive request validation
- ✅ **Rate Limiting** - Protection against abuse
- ✅ **CORS Support** - Cross-origin requests
- ✅ **Security Headers** - Helmet.js for security
- ✅ **Docker Support** - Easy deployment with Docker Compose
- ✅ **Health Checks** - Monitoring endpoints
- ✅ **Graceful Shutdown** - Proper cleanup on exit

## Database Schema

### Guests Table
```sql
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    team VARCHAR(10) NOT NULL CHECK (team IN ('BRIDE', 'GROOM')),
    plus_one BOOLEAN NOT NULL,
    created TIMESTAMP DEFAULT NOW()
);
```

### Request Logs Table
```sql
CREATE TABLE request_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payload TEXT NOT NULL,
    created TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Guest Management
- `POST /api/guests` - Create a new guest
- `GET /api/guests` - Get all guests
- `GET /api/guests/:id` - Get guest by ID
- `GET /api/guests/team/:team` - Get guests by team (BRIDE/GROOM)
- `GET /api/guests/stats` - Get guest statistics
- `GET /api/guests/logs` - Get request logs

### Health Check
- `GET /health` - API health status

## Request/Response Format

### Create Guest Request
```json
{
  "name": "John Doe",
  "team": "BRIDE",
  "plus_one": true
}
```

### API Response Format
```json
{
  "success": true,
  "message": "Guest created successfully",
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "team": "BRIDE",
    "plus_one": true,
    "created": "2024-01-01T00:00:00.000Z"
  }
}
```

## Quick Start

### Option 1: Docker Compose (Recommended)

1. **Start the services:**
   ```bash
   docker compose up -d
   ```

2. **Check the logs:**
   ```bash
   docker compose logs -f backend
   ```

3. **Test the API:**
   ```bash
   curl http://localhost:3001/health
   ```

### Option 2: Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

3. **Start PostgreSQL** (if not using Docker):
   ```bash
   # Install PostgreSQL locally or use Docker
   docker run -d --name postgres \
     -e POSTGRES_DB=wedding_db \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=postgres \
     -p 5432:5432 \
     postgres:15-alpine
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `NODE_ENV` | `development` | Environment |
| `DB_HOST` | `localhost` | Database host |
| `DB_PORT` | `5432` | Database port |
| `DB_NAME` | `wedding_db` | Database name |
| `DB_USER` | `postgres` | Database user |
| `DB_PASSWORD` | `postgres` | Database password |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed CORS origin |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |

## Testing the API

### Create a Guest
```bash
curl -X POST http://localhost:3001/api/guests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "team": "BRIDE",
    "plus_one": true
  }'
```

### Get All Guests
```bash
curl http://localhost:3001/api/guests
```

### Get Statistics
```bash
curl http://localhost:3001/api/guests/stats
```

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Project Structure
```
src/
├── config/          # Configuration management
├── controllers/     # Request handlers
├── database/        # Database connection
├── middleware/      # Express middleware
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript types
└── index.ts         # Application entry point
```

## Security Features

- **Input Validation** - All requests are validated
- **Rate Limiting** - Prevents abuse
- **CORS Protection** - Controlled cross-origin access
- **Security Headers** - Helmet.js protection
- **SQL Injection Protection** - Parameterized queries
- **Error Handling** - No sensitive data in error responses

## Monitoring

- **Health Check** - `/health` endpoint
- **Request Logging** - All requests logged to database
- **Error Logging** - Comprehensive error tracking
- **Database Monitoring** - Connection pool management

## Production Deployment

1. **Build the Docker image:**
   ```bash
   docker build -t wedding-backend .
   ```

2. **Run with environment variables:**
   ```bash
   docker run -d \
     -p 3001:3001 \
     -e DB_HOST=your-db-host \
     -e DB_PASSWORD=your-db-password \
     wedding-backend
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License 