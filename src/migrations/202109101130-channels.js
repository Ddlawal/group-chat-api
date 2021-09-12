module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'channels',
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
              model: 'users',
              key: 'userId',
            },
            allowNull: true,
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
      await queryInterface.dropTable('channels', { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
}
