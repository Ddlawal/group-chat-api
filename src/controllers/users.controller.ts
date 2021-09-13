import { NextFunction, Request, Response } from 'express'
import { UserI } from '@interfaces/users.interface'
import userService from '@services/users.service'
import { UserCreationI } from '@/models/users.model'

class UsersController {
  public userService = new userService()

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { page, limit } = req.body

      page = page ? page : 1
      limit = limit ? limit : 50

      const offset = limit * (page - 1)

      const findAllUsersData: UserI[] = await this.userService.findAllUser({
        limit,
        offset,
        channelId: req.body.channelId,
      })

      res.status(200).json({ data: findAllUsersData, message: 'findAll' })
    } catch (error) {
      next(error)
    }
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId)
      const findOneUserData: UserI = await this.userService.findUserById(userId)

      res.status(200).json({ data: findOneUserData, message: 'findOne' })
    } catch (error) {
      next(error)
    }
  }

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId)
      const userData: UserCreationI = req.body
      const updateUserData: UserI = await this.userService.updateUser(userId, userData)

      res.status(200).json({ data: updateUserData, message: 'updated' })
    } catch (error) {
      next(error)
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId)
      const deleteUserData: UserI = await this.userService.deleteUser(userId)

      res.status(200).json({ data: deleteUserData, message: 'deleted' })
    } catch (error) {
      next(error)
    }
  }
}

export default UsersController
