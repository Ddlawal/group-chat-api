import { NextFunction, Request, Response } from 'express'
import { ChannelI } from '@interfaces/channels.interface'
import channelService from '@services/channels.service'
import { ChannelCreationI } from '@/models/channels.model'
import { RequestWithUser } from '@/interfaces/auth.interface'
import DB from '@/databases'

class ChannelsController {
  public channelService = new channelService()

  public getAllChannels = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let { page, limit } = req.body

      page = page ? page : 1
      limit = limit ? limit : 50

      const offset = limit * (page - 1)

      const findAllChannelsData: ChannelI[] = await this.channelService.findAllChannel({
        limit,
        offset,
        searchQuery: req.body.searchQuery,
      })

      res.status(200).json({ data: findAllChannelsData, message: 'findAll' })
    } catch (error) {
      next(error)
    }
  }

  public getChannels = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let { page, limit } = req.body
      const { userId } = req.user

      page = page ? page : 1
      limit = limit ? limit : 50

      const offset = limit * (page - 1)

      const findAllChannelsData: ChannelI[] = await this.channelService.findChannel({
        limit,
        offset,
        userId,
        searchQuery: req.body.searchQuery,
      })

      res.status(200).json({ data: findAllChannelsData, message: 'findAll' })
    } catch (error) {
      next(error)
    }
  }

  public getChannelById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const channelId = Number(req.params.channelId)
      const findOneChannelData: ChannelI = await this.channelService.findChannelById(channelId)

      res.status(200).json({ data: findOneChannelData, message: 'findOne' })
    } catch (error) {
      next(error)
    }
  }

  public createChannel = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const tr = await DB.sequelize.transaction()
    try {
      const channelData: ChannelCreationI = req.body
      const { userId } = req.user
      const createdChannelData: ChannelI = await this.channelService.createChannel(userId, channelData, tr)

      await tr.commit()

      res.status(201).json({ data: createdChannelData, message: 'Channel successfully created' })
    } catch (error) {
      await tr.rollback()

      next(error)
    }
  }

  public updateChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const channelId = Number(req.params.channelId)
      const channelData: ChannelCreationI = req.body
      const updateChannelData: ChannelI = await this.channelService.updateChannel(channelId, channelData)

      res.status(200).json({ data: updateChannelData, message: 'updated' })
    } catch (error) {
      next(error)
    }
  }

  public deleteChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const channelId = Number(req.params.channelId)
      const deleteChannelData: ChannelI = await this.channelService.deleteChannel(channelId)

      res.status(200).json({ data: deleteChannelData, message: 'deleted' })
    } catch (error) {
      next(error)
    }
  }
}

export default ChannelsController
