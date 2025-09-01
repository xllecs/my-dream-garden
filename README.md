# My Dream Garden
**My Dream Garden** is a simple backend service designed for passionate plant enthusiats to help them efficiently
manage gardens and plants.

## Features:
### REST API
A REST API was exposed for users to run CRUD operations against the data they need:
- Gardens:
  - View a single garden
  - List all gardens for the logged in user
  - Create gardens
  - Update gardens
  - Delete gardens
- Plants:
  - View a single plants
  - List all plants for a given garden
  - Create plants
  - Update plants
  - Delete plants
- Realtime plant metrics:
  - View metrics for a given plant

An extensive documentation of all the endpoints above is available at `localhost:3000/api-docs` after running the app.

### Authentication and authorization
Most of the features behind this service are protected by registering and logging in system implemented using JWT.
In order to be able to manage your gardens and plants you will first need to create an account via the `localhost:3000/auth/register`
endpoint. Here you will need to provide the following required parameters:

- `firstName`
- `lastName`
- `emailAddress`
- `password`

After succesfully creating an account, you need to login via `localhost:3000/auth/login` using your `emailAddress` and `password`.
This will provide you with an JWT token that's available for 10 minutes (configurable); after expiration, you will have to login again.

### Redis
Redis was implemented to cache frequently used data, such as listing of all gardens after logging in, all plants within a
specific garden, and detailed plant information. Redis really comes in handy because it minimizes unnecessary database
calls and optimizes response times.

### PostgreSQL and Prisma
PostgreSQL is a widely used SQL database and it was chosen as the main storage for the long-term data. Here is where we store users, gardens, plants and realtime plant metrics.

Prisma makes querying and accessing the database easy and quick. Used to implement the models and, fetching and putting data from/into
the database.

### Docker and Docker Compose
Both used to run the app in a containerized environment and allow the users to quickly setup and run the app by running one command.

## Tech stack
- Node.js + TS + Express
- PostgreSQL + Prisma
- Redis
- Docker + Docker Compose

## Prerequisites
- Node.js v18+ (if running locally without Docker)
- Docker and Docker Compose

## Cloning, setting up and running

### Clone the project
```
git clone https://github.com/xllecs/my-dream-garden
cd my-dream-garden
```

### Expose a `.env` file
```
DATABASE_URL="postgresql://postgres:postgres@db:5432/my_dream_garden_db"
PORT=3000

JWT_SECRET=""
JWT_EXPIRES_IN="10m"
```

### Running with Docker
```
docker compose up --build
```

### API endpoints
After running the app you can find the API documenation at `localhost:3000/api-docs`.
