import dotenv from "dotenv";
import pg from "pg"
dotenv.config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    dialectModule: pg,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    dialectModule: pg,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectModule: pg,
  },
};