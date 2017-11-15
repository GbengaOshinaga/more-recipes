module.exports = {
  development: {
    username: 'postgres',
    password: 'Gee&o4me',
    database: 'more-recipes',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'Gee&o4me',
    database: 'more-recipes-test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    environment: 'production'
  }
};

