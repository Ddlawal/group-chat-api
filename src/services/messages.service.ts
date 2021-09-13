import { MessageI, MessageQueryI } from '@interfaces/messages.interface'
import { Message } from '@/models/messages.model'

class MessageService {
  private messages = Message

  public async findAllMessages({ limit, offset, channelId }: MessageQueryI): Promise<MessageI[]> {
    const messages: MessageI[] = await this.messages.findAll({
      where: { channelId },
      limit,
      offset,
    })

    return messages
  }
}

export default MessageService
