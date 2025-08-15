# Test Project

A full-stack application with Next.js client and Hono server using PostgreSQL database.

## Prerequisites

- Node.js 18+
- Yarn package manager
- Docker and Docker Compose (for database)

## Local Development Setup

### 1. Install Dependencies

```bash
yarn install
```

### 2. Start PostgreSQL Database

```bash
docker-compose up -d postgres
```

### 3. Environment Setup

Create `.env` file in the server directory:

```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/testdb
```

### 4. Database Migration and Seeding

```bash
# Push database schema
yarn server:push

# Seed the database
yarn server:seed
```

### 5. Start Development Servers

```bash
# Start server (runs on port 3001)
yarn server:dev

# Start client (runs on port 3000)
yarn ui:dev
```

## Docker Compose Setup

Run the entire stack with Docker Compose:

```bash
docker-compose up
```

This will start:
- PostgreSQL database on port 5432
- Hono server on port 3001
- Next.js client on port 3000

## Scripts

- `yarn server:dev` - Start server in development mode
- `yarn ui:dev` - Start client in development mode
- `yarn server:push` - Push database schema changes
- `yarn server:seed` - Seed database with initial data

## Project Structure

- `/client` - Next.js frontend application
- `/server` - Hono backend API server
- `/server/src/db` - Database schema and configuration
