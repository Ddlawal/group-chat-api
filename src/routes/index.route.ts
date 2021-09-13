import { Routes } from '@/interfaces/routes.interface'
import express from 'express'
import authRoute from '@routes/auth.route'
import usersRoute from '@routes/users.route'
import channelsRoute from '@routes/channels.route'
import messagesRoute from '@routes/messages.route'

const routes = [authRoute, usersRoute, channelsRoute, messagesRoute]
const apiRouter = express()

routes.forEach(({ path, router }: Routes) => {
  apiRouter.use(path, router)
})

export default apiRouter
