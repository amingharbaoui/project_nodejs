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

I built two full CRUD resources: News and Tags. Both have the usual create, read, update, and delete operations, and both go through validation before anything touches the database. Required fields can't be empty, text fields like the author name or a tag name can't contain digits, titles need to be at least 5 characters, dates have to follow the YYYY MM DD format, and tag names have to be unique.

On top of that, `GET /news` supports pagination through `limit` and `offset` query parameters, and `GET /news/search` lets you search across both the title and the content at once instead of just one field. Every endpoint is documented on a page served at the root route, so anyone running the project locally can see what's available without opening the code.

A few small things I added along the way: duplicate tags return a proper 409 Conflict instead of a generic server error, and paginated responses include the total count so a client can build real pagination instead of guessing.

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

- [Claude](https://claude.ai/), used throughout development for help structuring the project and 
  debugging
- [Postman](https://www.postman.com), used to test and debug every endpoint while building this
- [Stack Overflow](https://stackoverflow.com), for the usual debugging detours
- [Perplexity](https://www.perplexity.ai), used for quick research along the way
- [readme.so](https://readme.so), used as a starting point for structuring this README

## Author

[@amingharbaoui](https://github.com/amingharbaoui)

## License

Released under the MIT License.