const { config } = require('dotenv')
const path = require('path')

config({
  path: path.join(__dirname, '../../.env'),
})

const channelId = process.env.WELCOME_CHANNEL_ID

module.exports = {
  up: async queryInterface => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('channels', [
        {
          channelId,
          channelName: 'Welcome',
          channelDescription: 'This channel is for everyone',
          creatorId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  down: async queryInterface => {
    try {
      await queryInterface.bulkDelete('channels', { channelId }, {})
    } catch (err) {
      throw err
    }
  },
}
