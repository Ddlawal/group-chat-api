import { Server } from 'socket.io'
import { logger } from '@utils/logger'
import { EVENTS } from './events'
import { ChannelMember } from '@/models/channelMemebers.model'
import { Message } from '@/models/messages.model'

const io = new Server()

interface JoinChannelI {
  channelId: string
  userId: string
  fullName: string
}

io.on('connection', async socket => {
  logger.info(`User connected ${socket.id}`)

  socket.join('924fe47f-ce2b-442e-adb2-da9f033b3e04')

  socket.on(EVENTS.JOIN_CHANNEL, async ({ channelId, userId, fullName }: JoinChannelI) => {
    socket.join(channelId)

    const alreadyAdded = await ChannelMember.findOne({ where: { channelId, userId } })

    if (alreadyAdded) return

    const { createdAt } = await ChannelMember.create({ userId, channelId })

    socket.in(channelId).emit(EVENTS.NEW_USER, {
      message: `${fullName} joined`,
      time: `${createdAt.getHours()}:${createdAt.getMinutes()}`,
    })
  })

  socket.on(EVENTS.TYPING, ({ channelId, fullName }) => {
    socket.to(channelId).emit(EVENTS.TYPING, {
      message: `${fullName} is typing`,
    })
  })

  socket.on(EVENTS.NEW_MESSAGE, async ({ channelId, userId, fullName, message }) => {
    await Message.create({ message, channelId, userId })
    socket.in(channelId).emit(EVENTS.NEW_MESSAGE, {
      message,
      fullName,
      userId,
    })
  })
})

export default io
