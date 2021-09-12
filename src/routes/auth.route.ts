import { Router } from 'express'
import AuthController from '@controllers/auth.controller'
import authMiddleware from '@middlewares/auth.middleware'

const authController = new AuthController()
const path = '/auth'
const router = Router()

router.post('/signup', authController.signUp)
router.post('/login', authController.logIn)
router.post('/logout', authMiddleware, authController.logOut)

export default { path, router }
