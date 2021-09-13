import { NextFunction, Request, Response } from 'express'
import { UserI } from '@interfaces/users.interface'
import AuthService from '@services/auth.service'
import { UserCreationI } from '@/models/users.model'
import DB from '@/databases'

class AuthController {
  public authService = new AuthService()

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const tr = await DB.sequelize.transaction()
    try {
      const userData: UserCreationI = req.body
      const signUpUserData: UserI = await this.authService.signup(userData, tr)

      await tr.commit()

      res.status(201).json({ data: signUpUserData, message: 'Signup successful' })
    } catch (error) {
      await tr.rollback()

      next(error)
    }
  }

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserCreationI = req.body
      const { token, user } = await this.authService.login(userData)

      res.status(200).json({ token, user })
    } catch (error) {
      next(error)
    }
  }

  public logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserI = req.user
      await this.authService.logout(userData)

      res.status(200).json({ data: null, message: 'You have logged out successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
