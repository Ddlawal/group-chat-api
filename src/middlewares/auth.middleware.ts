import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { HttpException } from '@middlewares/error.middleware'
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface'
import config from '@/config/config'
import { User } from '@/models/users.model'

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.header('Authorization').split(' ')[1] || null
    console.log(Authorization)
    if (Authorization) {
      const secretKey: string = config.secretKey
      const verificationResponse = jwt.verify(Authorization, secretKey) as DataStoredInToken
      const userId = verificationResponse.userId
      const foundUser = await User.findByPk(userId)

      if (foundUser) {
        req.user = foundUser
        next()
      } else {
        next(new HttpException(401, 'Wrong authentication token'))
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'))
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'))
  }
}

export default authMiddleware
