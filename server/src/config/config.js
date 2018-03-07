
module.exports = {
  development: {
    username: 'postgres',
    password: 'Gee&o4me',
    database: 'more_recipes',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'Gee&o4me',
    database: 'more_recipes_test',
    host: '127.0.0.1',
    port: 5432,
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
