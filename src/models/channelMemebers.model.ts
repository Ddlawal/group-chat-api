import DB from '@/databases'
import { ChannelMemberI } from '@/interfaces/channelMembers:interface'
import { Association, DataTypes, Model, Optional } from 'sequelize'
import { Channel } from './channels.model'
import { User } from './users.model'

export type ChannelMenberCreationI = Optional<ChannelMemberI, 'channelMemberId'>

export class ChannelMember extends Model<ChannelMemberI, ChannelMenberCreationI> {
  public channelMemberId: string
  public channelId: string
  public userId: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public readonly user?: User
  public readonly channel?: User

  public static associations: {
    user: Association<ChannelMember, User>
    channel: Association<ChannelMember, Channel>
  }
}

ChannelMember.init(
  {
    channelMemberId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
  { tableName: 'channelMembers', sequelize: DB.sequelize },
)
