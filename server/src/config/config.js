import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_TEST_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    environment: 'production'
  }
};
