# Craft Vite Boilerplate

Test of Craft + Vite using [vite-plugin-craftcms](https://www.npmjs.com/package/vite-plugin-craftcms)

## Setup
- Create a MySQL-compatible database called `craft-vite-boilerplate`
- `composer install`
- `cp env.sample .env` and modify the contents of `.env` to match your setup

### DDEV

You'll need [Docker](https://www.docker.com/) and [DDEV](https://ddev.com) installed on your machine,
then run:

```bash
ddev start
```

### Front End Dependencies

First, make sure you have [NodeJS](http://nodejs.org) installed. Then:

* `npm i`
* `npm start`

### Development Server

While the development server is running, you can access the site at http://craft-vite-boilerplate.test (exact URL will depend on your local development environment).

## Deployment

Run `npm run build` to build prepare all assets for deployment.