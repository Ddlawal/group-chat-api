import { HttpException } from '@middlewares/error.middleware'
import { UserI } from '@interfaces/users.interface'
import { isFalsy } from '@utils/util'
import { User, UserCreationI } from '@/models/users.model'

class UserService {
  public users = User

  public async findAllUser({ limit, offset }: { limit: number; offset: number }): Promise<UserI[]> {
    const allUser: UserI[] = await this.users.findAll({ limit, offset })

    return allUser
  }

  public async findUserById(userId: number): Promise<UserI> {
    if (isFalsy(userId)) throw new HttpException(400, "You're not userId")

    const findUser: UserI = await this.users.findByPk(userId)
    if (!findUser) throw new HttpException(409, "You're not user")

    return findUser
  }

  public async updateUser(userId: number, userData: UserCreationI): Promise<UserI> {
    if (isFalsy(userData)) throw new HttpException(400, "You're not userData")

    const findUser: UserI = await this.users.findByPk(userId)
    if (!findUser) throw new HttpException(409, "You're not user")

    await this.users.update({ ...userData }, { where: { userId } })

    const updateUser: UserI = await this.users.findByPk(userId)
    return updateUser
  }

  public async deleteUser(userId: number): Promise<UserI> {
    if (isFalsy(userId)) throw new HttpException(400, "You're not userId")

    const findUser: UserI = await this.users.findByPk(userId)
    if (!findUser) throw new HttpException(409, "You're not user")

    await this.users.destroy({ where: { userId } })

    return findUser
  }
}

export default UserService
