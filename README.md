# Sportclub API

A data-driven REST API for a local sports club, built with Node.js, Express, and MySQL. Companion project to [project_laravel](https://github.com/amingharbaoui/project_laravel).

![Node.js](https://img.shields.io/badge/Node.js-26-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.4-4479A1?style=flat-square&logo=mysql&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## What is this?

This is the Node.js counterpart to my [Laravel Sportclub project](https://github.com/amingharbaoui/project_laravel). It's a standalone data-driven REST API — not connected to the Laravel front end — built to practice designing a backend with Express and MySQL: resource-style routers, controllers, a connection pool, and request validation, all returning plain JSON.

The API manages **news posts** and **tags** for the club, connected through a many-to-many relationship, similar in spirit to the `News` ↔ `Tag` relationship in the Laravel project.

## Features

### Core

- **CRUD for News** — create, read, update, and delete news posts, including their linked tags
- **CRUD for Tags** — create, read, update, and delete tags, with duplicate-name protection
- **Validation** — required fields, no digits allowed in text fields, minimum title length, strict date format, and unique-tag enforcement
- **Pagination** — `GET /news` supports `limit` and `offset` query parameters
- **Search** — `GET /news/search` searches across both the `title` and `content` fields
- **API documentation page** — a plain HTML page served at the root (`/`) describing every endpoint

### Extra features

- Search across two fields at once (`title` and `content`), not just one
- Duplicate-entry handling for tags (returns a clear `409 Conflict` instead of a generic server error)
- Response metadata on paginated results (`total`, `limit`, `offset`) so a client can build proper pagination

## Tech stack

| | |
|---|---|
| Runtime | Node.js 26.7.0 |
| Framework | Express 5 |
| Database | MySQL 8.4 |
| Database driver | mysql2 (promise-based) |
| Local environment | Laragon |
| Version control | Git & GitHub |

## Screenshots

## Getting started

You'll need Node.js 20+ (built with v26.7.0, npm 12.0.2), and MySQL (e.g. via [Laragon](https://laragon.org/) or [XAMPP](https://www.apachefriends.org/)).

```bash
git clone https://github.com/amingharbaoui/project_nodejs.git
cd project_nodejs
npm install
```

Create a `.env` file in the project root:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=nodejs
PORT=3000
```

Create the database and tables by running `setup.sql` in HeidiSQL or another MySQL client (it also seeds some sample news posts and tags):

```bash
mysql -u root -p < setup.sql
```

Or paste the contents of `setup.sql` into your MySQL client's query window.

Start the server:

```bash
npm run dev
```

Visit `http://localhost:3000` — this shows the full endpoint documentation.

## Endpoints

A complete, always up-to-date list of endpoints, query parameters, request bodies, and validation rules is served at the root route (`GET /`) of the running app.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/news` | All news posts (`limit`, `offset`) |
| GET | `/news/search?q=...` | Search by title and content |
| GET | `/news/:id` | One news post, including its tags |
| POST | `/news` | Create a news post |
| PUT | `/news/:id` | Update a news post |
| DELETE | `/news/:id` | Delete a news post |
| GET | `/tags` | All tags |
| GET | `/tags/:id` | One tag |
| POST | `/tags` | Create a tag |
| PUT | `/tags/:id` | Update a tag |
| DELETE | `/tags/:id` | Delete a tag |

## Project structure

```
project_nodejs/
├── config/
│   └── db.js              # MySQL connection pool
├── controllers/
│   ├── newsController.js  # CRUD + search/pagination for News
│   ├── tagController.js   # CRUD for Tag
│   └── validators.js      # Reusable validation functions
├── routes/
│   ├── newsRoutes.js
│   └── tagRoutes.js
├── server.js               # App entry point
├── .env                     # Database config (not in git)
└── .gitignore
```

## References

Express. (n.d.). *Express documentation*. Retrieved August 2026, from https://expressjs.com/

MySQL2. (n.d.). *mysql2 npm package documentation*. Retrieved August 2026, from https://www.npmjs.com/package/mysql2

dotenv. (n.d.). *dotenv npm package documentation*. Retrieved August 2026, from https://www.npmjs.com/package/dotenv

## Acknowledgements

- [Postman](https://www.postman.com) for testing and debugging the API endpoints

## Author

[@amingharbaoui](https://github.com/amingharbaoui)

## License

Released under the MIT License.