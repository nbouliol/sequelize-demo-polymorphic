# Setup

Install dependencies

```bash
yarn install
```

Edit `config/config.json` with your database credentials

Create the database

```bash
yarn sequelize-cli db:create
```

Migrate the database

```bash
yarn sequelize-cli db:migrate
```

Seed the database

```bash
yarn sequelize-cli db:seed:all
```

Create a new forest admin project and paste your `FOREST_AUTH_SECRET` and `FOREST_ENV_SECRET` in the .env file

Start your agent

```bash
yarn start:watch
```
