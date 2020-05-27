## Heimdall

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

For development, you will need to have installed on your machine:

- PostgreSQL
- NodeJS

#### Server

Before starting Nodejs/Express application:

- run `npm install`
- Create postgres database
- Create an `.env` in `server` directory
- Add database url to `.env`

```
DB_URI = postgres://<username>:<password>@localhost/<database-name>
```

To start:

- dev: `npm run dev:start`
- start: `npm start`
- run cron: `npm run worker:start`

#### Client

Before starting Client

- run `npm install`

To start: `npm run start`
