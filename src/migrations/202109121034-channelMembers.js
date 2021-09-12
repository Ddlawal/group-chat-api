module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'channelMembers',
        {
          channelMemberId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },

          userId: {
            type: DataTypes.UUID,
            references: {
              model: 'users',
              key: 'userId',
            },
          },

          channelId: {
            type: DataTypes.UUID,
            references: {
              model: 'channels',
              key: 'channelId',
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
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async queryInterface => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('channelMembers', { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
}
