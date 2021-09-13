import { Router } from 'express'
import MessagesController from '@controllers/messages.controller'
import authMiddleware from '@/middlewares/auth.middleware'

const path = '/messages'
const router = Router()
const messagesController = new MessagesController()

router.post('/', authMiddleware, messagesController.getMessages)

export default { path, router }
