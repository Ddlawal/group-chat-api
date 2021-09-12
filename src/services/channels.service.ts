import { HttpException } from '@middlewares/error.middleware'
import { ChannelI, ChannelQueryI } from '@interfaces/channels.interface'
import { Channel, ChannelCreationI } from '@/models/channels.model'
import { ChannelMember } from '@/models/channelMemebers.model'
import { Op, Transaction } from 'sequelize'

class ChannelService {
  private channels = Channel
  private channelMembers = ChannelMember

  public async findAllChannel({ limit, offset, searchQuery }: ChannelQueryI): Promise<ChannelI[]> {
    const channels: ChannelI[] = await this.channels.findAll({
      where: searchQuery ? { channelName: { [Op.substring]: searchQuery } } : {},
      limit,
      offset,
    })

    return channels
  }

  public async findChannel({ limit, offset, userId, searchQuery }: ChannelQueryI): Promise<ChannelI[]> {
    const userChannels = await this.channelMembers.findAll({ where: { userId }, raw: true, attributes: ['channelId'] })
    const userChannelIds = userChannels.map(({ channelId }) => channelId)

    const channels: ChannelI[] = await this.channels.findAll({
      where: searchQuery
        ? { channelId: { [Op.in]: userChannelIds }, channelName: { [Op.substring]: searchQuery } }
        : { channelId: { [Op.in]: userChannelIds } },
      limit,
      offset,
    })

    return channels
  }

  public async findChannelById(channelId: number): Promise<ChannelI> {
    const foundChannel: ChannelI = await this.channels.findByPk(channelId)
    if (!foundChannel) throw new HttpException(409, "You're not user")

    return foundChannel
  }

  public async createChannel(
    userId: string,
    channelData: ChannelCreationI,
    transaction: Transaction,
  ): Promise<ChannelI> {
    const createdChannel = await this.channels.create(channelData, { transaction })

    await this.channelMembers.create({ channelId: createdChannel.channelId, userId }, { transaction })

    return createdChannel
  }

  public async updateChannel(channelId: number, channelData: ChannelCreationI): Promise<ChannelI> {
    const foundChannel: ChannelI = await this.channels.findByPk(channelId)
    if (!foundChannel) throw new HttpException(409, "You're not user")

    await this.channels.update({ ...channelData }, { where: { channelId } })

    const updateChannel: ChannelI = await this.channels.findByPk(channelId)
    return updateChannel
  }

  public async deleteChannel(channelId: number): Promise<ChannelI> {
    const foundChannel: ChannelI = await this.channels.findByPk(channelId)
    if (!foundChannel) throw new HttpException(409, "You're not user")

    await this.channels.destroy({ where: { channelId } })

    return foundChannel
  }
}

export default ChannelService
