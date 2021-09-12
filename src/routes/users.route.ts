import { Router } from 'express'
import UsersController from '@controllers/users.controller'

const path = '/users'
const router = Router()
const usersController = new UsersController()

router.get('/', usersController.getUsers)
router.get('/:id(\\d+)', usersController.getUserById)
router.put('/:id(\\d+)', usersController.updateUser)
router.delete('/:id(\\d+)', usersController.deleteUser)

export default { path, router }
