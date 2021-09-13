import { UserI } from '@/interfaces/users.interface'

declare global {
  namespace Express {
    interface Request {
      user: UserI
    }
  }
}
