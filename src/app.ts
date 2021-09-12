import { resolve } from 'path'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import DB from '@databases'
import { errorMiddleware } from '@middlewares/error.middleware'
import { stream } from '@utils/logger'
import config from './config/config'
import routes from '@routes/index.route'

const app = express()

DB.sequelize.authenticate()

app.use(morgan(config.log.format, { stream }))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./client/build'))

app.use(errorMiddleware)

app.use('/api/', routes)

app.get('/', (req: any, res: any) => {
  res.sendFile(resolve('index.html'))
})

const options = {
  swaggerDefinition: {
    info: {
      title: 'REST API',
      version: '1.0.0',
      description: 'Example docs',
    },
  },
  apis: ['swagger.yaml'],
}

const specs = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

export default app
