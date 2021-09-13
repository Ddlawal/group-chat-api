import { join } from 'path'
import { config } from 'dotenv'
import app from '@/app'
import http from 'http'
import io from './socket'
import { logger } from './utils/logger'

config({ path: join(__dirname + '.env') })

const port = process.env.PORT

const httpServer = http.createServer(app)

io.attach(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

httpServer.listen(port, () => {
  logger.info(`🚀 App listening on the port ${port}`)
})
