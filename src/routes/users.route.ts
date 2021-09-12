import { Router } from 'express'
import UsersController from '@controllers/users.controller'
import authMiddleware from '@/middlewares/auth.middleware'

const path = '/users'
const router = Router()
const usersController = new UsersController()

router.get('/:channelId', authMiddleware, usersController.getUsers)
router.get('/:userId', authMiddleware, usersController.getUserById)
router.put('/:userId', authMiddleware, usersController.updateUser)
router.delete('/:userId', authMiddleware, usersController.deleteUser)

export default { path, router }
