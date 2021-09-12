import Sequelize from 'sequelize'
import { dbConfig } from '@interfaces/db.interface'
import { logger } from '@utils/logger'
import config from '@config/config'

const nodeEnv = process.env.NODE_ENV

const { host, username, password, database, dialect }: dbConfig = config[`${nodeEnv}`]
const sequelize = new Sequelize.Sequelize(database, username, password, {
  host,
  dialect,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    freezeTableName: true,
    paranoid: true,
  },
  logQueryParameters: process.env.NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query)
  },
  benchmark: true,
})

const DB = {
  sequelize, // connection instance
  Sequelize, // library
}

export default DB
