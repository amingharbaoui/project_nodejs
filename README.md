# project_nodejs

A data-driven REST API for a local sports club, built with Node.js, Express, and MySQL. Companion project to [project_laravel](https://github.com/amingharbaoui/project_laravel).

![Node.js](https://img.shields.io/badge/Node.js-26-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.4-4479A1?style=flat-square&logo=mysql&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## What is this?

This is the Node.js counterpart to my [Laravel Sportclub project](https://github.com/amingharbaoui/project_laravel). I already had the site built in Laravel, so for this one I wanted to build something separate: a standalone REST API using Express and MySQL, with its own database, its own routes, and no connection at all to the Laravel front end. It only returns JSON, nothing else.

I reused the same subject (a local sports club) because it let me focus on the backend itself instead of inventing a whole new dataset. The API manages news posts and tags for the club, connected through a many to many relationship, similar in spirit to how News and Tag are related in the Laravel project.

## Features

### Core

- **CRUD for News** — create, read, update, and delete news posts, including their linked tags
- **CRUD for Tags** — create, read, update, and delete tags, with duplicate-name protection
- **Validation** — required fields, no digits in text fields, minimum title length, strict date format, unique tag names
- **Pagination** — `GET /news` supports `limit` and `offset` query parameters
- **Search** — `GET /news/search` searches across both the `title` and `content` fields
- **API documentation page** — served at the root (`/`), listing every endpoint

### Extra

- Search across two fields at once (`title` and `content`), not just one
- Sorting on `GET /news` (`title`, `author`, `published_at`, `created_at`) and `GET /tags` (`name`), both ascending and descending via a `sort` query parameter
- Duplicate tags return a clean `409 Conflict` instead of a generic server error
- Paginated responses include `total`, `limit`, and `offset`, so a client can build real pagination
- The documentation page is styled to match the visual identity of the companion Laravel project (same dark theme, dotted background, and accent colors), with a sticky, blurred navbar that hides on scroll down and reappears on scroll up, a scroll-spy that highlights the News or Tags section depending on where the user is on the page, and a fully responsive layout for mobile

## Tech stack

| | |
|---|---|
| Runtime | Node.js 26.7.0 |
| Framework | Express 5 |
| Database | MySQL 8.4 |
| Database driver | mysql2 (promise based) |
| Local environment | Laragon |
| Version control | Git and GitHub |

## Screenshots


## Getting started

You will need Node.js 20 or later (I built this with v26.7.0 and npm 12.0.2) and a running MySQL instance, for example through Laragon or XAMPP.

Clone the repo and install the dependencies:

```bash
git clone https://github.com/amingharbaoui/project_nodejs.git
cd project_nodejs
npm install
```

Create a `.env` file in the project root with your own database credentials:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=nodejs
PORT=3000
```

Run `setup.sql` to create the database, the tables, and a bit of sample data:

```bash
mysql -u root -p < setup.sql
```

Or just paste its contents into your MySQL client's query window if that's easier.

Then start the server:

```bash
npm run dev
```

Once it's running, open `http://localhost:3000` in your browser to see the full list of endpoints.

## Endpoints

The root route (`GET /`) always has the most up to date and complete documentation, including query parameters, request bodies, and validation rules. Here's the short version:

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
│   └── db.js
├── controllers/
│   ├── newsController.js
│   ├── tagController.js
│   └── validators.js
├── routes/
│   ├── newsRoutes.js
│   └── tagRoutes.js
├── public/
│   └── index.html
├── server.js
├── setup.sql
├── .env
└── .gitignore
```

## References

Express. (n.d.). *Express documentation*. Retrieved August 2026, from https://expressjs.com/

MySQL2. (n.d.). *mysql2 npm package documentation*. Retrieved August 2026, from https://www.npmjs.com/package/mysql2

dotenv. (n.d.). *dotenv npm package documentation*. Retrieved August 2026, from https://www.npmjs.com/package/dotenv

## Acknowledgements

- [Claude](https://claude.ai), used throughout development for help structuring the project and debugging
- [Postman](https://www.postman.com), used to test and debug every endpoint while building this
- [Stack Overflow](https://stackoverflow.com), for the usual debugging detours
- [Perplexity](https://www.perplexity.ai), used for quick research along the way
- [readme.so](https://readme.so), used as a starting point for structuring this README

## Author

[@amingharbaoui](https://github.com/amingharbaoui)

## License

Released under the MIT License.