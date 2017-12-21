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
    environment: 'production'
  }
};

