import { ChannelI } from '@/interfaces/channels.interface'
import { Association, DataTypes, Model, Optional } from 'sequelize'
import { User } from './users.model'
import DB from '@databases'

export type ChannelCreationI = Optional<ChannelI, 'channelId'>

export class Channel extends Model<ChannelI, ChannelCreationI> {
  public channelId: string
  public channelName: string
  public channelDescription?: string
  public creatorId?: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public readonly creator?: User

  public static associations: {
    creator: Association<Channel, User>
  }
}

Channel.init(
  {
    channelId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    channelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    channelDescription: {
      type: DataTypes.STRING,
    },

    creatorId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'userId',
      },
      allowNull: true,
    },
  },
  { tableName: 'channels', sequelize: DB.sequelize },
)
