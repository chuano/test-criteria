import dotenv from 'dotenv';
import fs from 'fs';
import Knex from 'knex';
import { Filter } from './Filter';
import { QueryGenerator } from './QueryGenerator';

const dotfile = `${__dirname}/../.env`;
if (fs.existsSync(dotfile)) dotenv.config({ path: dotfile });

const db = Knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  },
});

const generator = new QueryGenerator(db, 'users')
generator.addFilter(new Filter('name', 'like', 'os'))
generator.addFilter(new Filter("sxore", "<", 100800));
generator.getResult().then((result) => {
  console.log(result)
  process.exit(0)
})