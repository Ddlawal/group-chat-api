import { Request } from 'express'
import { UserI } from '@interfaces/users.interface'

export interface DataStoredInToken {
  userId: string
}

export interface TokenData {
  token: string
}

export interface RequestWithUser extends Request {
  user: UserI
}
