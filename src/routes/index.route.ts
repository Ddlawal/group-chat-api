import { Routes } from '@/interfaces/routes.interface'
import express from 'express'
import authRoute from '@routes/auth.route'
import usersRoute from '@routes/users.route'
import channelsRoute from '@routes/channels.route'

const routes = [authRoute, usersRoute, channelsRoute]
const apiRouter = express()

routes.forEach(({ path, router }: Routes) => {
  apiRouter.use(path, router)
})

export default apiRouter
