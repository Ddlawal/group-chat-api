import DB from '@/databases'
import { MessageI } from '@/interfaces/messages.interface'
import { Association, DataTypes, Model, Optional } from 'sequelize'
import { Channel } from './channels.model'
import { User } from './users.model'

export type MessageCreationI = Optional<MessageI, 'messageid'>

export class Message extends Model<MessageI, MessageCreationI> {
  public messageid: string
  public message: string
  public userId: string
  public channelId: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public readonly user?: User

  public static associations: {
    user: Association<Message, User>
  }
}

Message.init(
  {
    messageid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    message: {
      type: DataTypes.STRING({ length: 1000 }),
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'userId',
      },
      allowNull: false,
    },

    channelId: {
      type: DataTypes.UUID,
      references: {
        model: Channel,
        key: 'channelId',
      },
      allowNull: false,
    },
  },
  { tableName: 'messages', sequelize: DB.sequelize },
)
