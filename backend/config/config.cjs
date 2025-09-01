const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.SHOPFLOW_DB_USER || 'root',
    password: process.env.SHOPFLOW_DB_PASSWORD || null,
    database: process.env.SHOPFLOW_DB || 'database_development',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: process.env.SHOPFLOW_DB_USER || 'root',
    password: process.env.SHOPFLOW_DB_PASSWORD || null,
    database: process.env.SHOPFLOW_DB || 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.SHOPFLOW_DB_USER || 'root',
    password: process.env.SHOPFLOW_DB_PASSWORD || null,
    database: process.env.SHOPFLOW_DB || 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
