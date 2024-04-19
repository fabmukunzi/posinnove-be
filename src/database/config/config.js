const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL 
  },
  test: {
    url: process.env.TEST_DATABASE_URL
  },
  production: {
    url: process.env.DATABASE_URL
  }
};