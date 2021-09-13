import { NextFunction, Request, Response } from 'express'
import messageService from '@services/messages.service'
import { MessageI } from '@/interfaces/messages.interface'

class MessagesController {
  public messageService = new messageService()

  public getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { page, limit } = req.body

      page = page ? page : 1
      limit = limit ? limit : 50

      const offset = limit * (page - 1)

      const findAllMessagesData: MessageI[] = await this.messageService.findAllMessages({
        limit,
        offset,
        channelId: req.body.channelId,
      })

      res.status(200).json({ data: findAllMessagesData, message: 'findAll' })
    } catch (error) {
      next(error)
    }
  }
}

export default MessagesController
