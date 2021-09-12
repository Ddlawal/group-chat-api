import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { HttpException } from '@middlewares/error.middleware'
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface'
import { UserI } from '@interfaces/users.interface'
import { isFalsy } from '@utils/util'
import { User, UserCreationI } from '@/models/users.model'
import config from '@/config/config'
import { Transaction } from 'sequelize/types'
import { ChannelMember } from '@/models/channelMemebers.model'

const channelId = process.env.WELCOME_CHANNEL_ID

class AuthService {
  public users = User
  public channelMember = ChannelMember

  public async signup(userData: UserCreationI, transaction: Transaction): Promise<User> {
    if (isFalsy(userData)) throw new HttpException(400, 'No data provided')

    const emailExists = await this.users.findOne({ where: { email: userData.email } })
    if (emailExists) throw new HttpException(409, `Email already exists`)

    const createdUserData = await this.users.create(userData, { transaction })

    await createdUserData.createUsersPassword({ password: userData.password }, { transaction })

    await this.channelMember.create({ channelId, userId: createdUserData.userId }, { transaction })

    return createdUserData
  }

  public async login(userData: UserCreationI): Promise<{ token: string; user: UserI }> {
    if (isFalsy(userData)) throw new HttpException(400, 'Data not provided')

    const foundUser: User = await this.users.findOne({ where: { email: userData.email } })
    if (!foundUser) throw new HttpException(409, `Email doesn't exist! Please signup`)

    const { password } = await foundUser.getUsersPassword()

    const isPasswordMatching: boolean = await bcrypt.compare(`${userData.password}`, `${password}`)
    if (!isPasswordMatching) throw new HttpException(409, 'Invalid credentials')

    const { token } = this.createToken(foundUser)

    return { token, user: foundUser }
  }

  public async logout(userData: UserI): Promise<void> {
    if (isFalsy(userData)) throw new HttpException(400, 'No data provided')

    const foundUser: UserI = await this.users.findOne({ where: { email: userData.email } })
    if (!foundUser) throw new HttpException(409, "You're not user")
  }

  public createToken(user: UserI): TokenData {
    const dataStoredInToken: DataStoredInToken = { userId: user.userId }
    const secretKey: string = config.secretKey
    const expiresIn: number = 60 * 60

    return { token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) }
  }
}

export default AuthService
