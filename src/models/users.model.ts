import {
  DataTypes,
  Model,
  Optional,
  HasOneGetAssociationMixin,
  HasOneCreateAssociationMixin,
  Association,
} from 'sequelize'
import { UserI, UsersPasswordI } from '@interfaces/users.interface'
import { genSalt, hash } from 'bcrypt'
import DB from '@databases'
import { Channel } from '@models/channels.model'

export interface UserCreationI extends Optional<UserI, 'userId'> {
  password: string
}

export class User extends Model<UserI, UserCreationI> implements UserI {
  public userId: string
  public email: string
  public firstName: string
  public lastName: string

  public readonly fullName: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getUsersPassword: HasOneGetAssociationMixin<UsersPassword>
  public createUsersPassword!: HasOneCreateAssociationMixin<UsersPassword>

  public readonly usersPassword?: UsersPassword[]
  public readonly channelsCreated?: Channel[]

  public static associations: {
    usersPassword: Association<User, UsersPassword>
    channelsCreated: Association<User, Channel>
  }
}

export type UsersPasswordCreationI = Optional<UsersPasswordI, 'userId' | 'usersPasswordId'>

export class UsersPassword extends Model<UsersPasswordI, UsersPasswordCreationI> implements UsersPasswordI {
  public usersPasswordId: string
  public password: string
  public userId: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING({ length: 50 }),
      validate: {
        isEmail: {
          msg: 'Enter a valid email',
        },
      },
    },

    firstName: {
      type: DataTypes.STRING({ length: 100 }),
      allowNull: false,
      validate: {
        len: {
          msg: 'First name can not be empty',
          args: [1, 100],
        },
      },
    },

    lastName: {
      type: DataTypes.STRING({ length: 100 }),
      allowNull: false,
      validate: {
        len: {
          msg: 'Last name can not be empty',
          args: [1, 100],
        },
      },
    },

    fullName: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ['firstName', 'lastName']),
      get() {
        return `${this.firstName} ${this.lastName}`
      },
    },
  },
  {
    tableName: 'users',
    sequelize: DB.sequelize,
  },
)

UsersPassword.init(
  {
    usersPasswordId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    password: {
      type: DataTypes.STRING({ length: 128 }),
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'userId',
      },
    },
  },
  {
    tableName: 'usersPassword',
    sequelize: DB.sequelize,
  },
)

// Association

User.hasOne(UsersPassword, {
  foreignKey: 'userId',
})

UsersPassword.belongsTo(User, {
  foreignKey: 'userId',
})

User.hasMany(Channel, {
  sourceKey: 'userId',
  foreignKey: 'creatorId',
  as: 'creator',
})

Channel.belongsTo(User, {
  foreignKey: 'creatorId',
  as: 'channelsCreated',
})

// Hooks

UsersPassword.beforeSave(async user => {
  if (user.changed('password')) {
    const salt = await genSalt(10)
    const hashedPasword = await hash(`${user.password}`, salt)

    console.log(user.password, salt, hashedPasword)
    user.password = hashedPasword
  }
})
