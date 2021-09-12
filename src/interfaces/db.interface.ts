import { Dialect } from 'sequelize/types'

export interface dbConfig {
  host: string
  username: string
  password: string
  database: string
  dialect: Dialect
}
