module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'users',
        {
          userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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

          email: {
            type: DataTypes.STRING({ length: 50 }),
            validate: {
              isEmail: {
                msg: 'Enter a valid email',
              },
            },
          },

          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },

          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },

          deletedAt: {
            type: DataTypes.DATE,
            defaultValue: null,
          },
        },
        { transaction, paranoid: true, freezeTableName: true },
      )

      await queryInterface.createTable(
        'usersPassword',
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
              model: 'users',
              key: 'userId',
            },
          },

          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },

          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },

          deletedAt: {
            type: DataTypes.DATE,
            defaultValue: null,
          },
        },
        { transaction },
      )
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  down: async queryInterface => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('usersPassword', { transaction })
      await queryInterface.dropTable('users', { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
}
