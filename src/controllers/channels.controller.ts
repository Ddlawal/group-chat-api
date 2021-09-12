import { NextFunction, Request, Response } from 'express'
import { ChannelI } from '@interfaces/channels.interface'
import channelService from '@services/channels.service'
import { ChannelCreationI } from '@/models/channels.model'
import { RequestWithUser } from '@/interfaces/auth.interface'

class ChannelsController {
  public channelService = new channelService()

  public getChannels = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let { page, limit } = req.body
      const { userId } = req.user

      page = page ? page : 1
      limit = limit ? limit : 10

      const offset = limit * (page - 1)

      const findAllChannelsData: ChannelI[] = await this.channelService.findAllChannel({ limit, offset, userId })

      res.status(200).json({ data: findAllChannelsData, message: 'findAll' })
    } catch (error) {
      next(error)
    }
  }

  public getChannelById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const channelId = Number(req.params.id)
      const findOneChannelData: ChannelI = await this.channelService.findChannelById(channelId)

      res.status(200).json({ data: findOneChannelData, message: 'findOne' })
    } catch (error) {
      next(error)
    }
  }

  public updateChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const channelId = Number(req.params.id)
      const channelData: ChannelCreationI = req.body
      const updateChannelData: ChannelI = await this.channelService.updateChannel(channelId, channelData)

      res.status(200).json({ data: updateChannelData, message: 'updated' })
    } catch (error) {
      next(error)
    }
  }

  public deleteChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const channelId = Number(req.params.id)
      const deleteChannelData: ChannelI = await this.channelService.deleteChannel(channelId)

      res.status(200).json({ data: deleteChannelData, message: 'deleted' })
    } catch (error) {
      next(error)
    }
  }
}

export default ChannelsController
