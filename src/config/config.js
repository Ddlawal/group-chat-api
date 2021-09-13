const { config } = require('dotenv')
const path = require('path')

config({
  path: path.join(__dirname, '../../.env'),
})

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_SERVER,
    dialect: 'mysql',
    seederStorageTableName: 'sequelizeData',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_SERVER,
    dialect: 'mysql',
  },
  secretKey: process.env.SECRET_KEY,
  log: {
    format: 'dev',
    dir: '../logs',
  },
  cors: {
    origin: true,
    credentials: true,
  },
}
