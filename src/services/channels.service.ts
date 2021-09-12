import { HttpException } from '@middlewares/error.middleware'
import { ChannelI, ChannelQueryI } from '@interfaces/channels.interface'
import { Channel, ChannelCreationI } from '@/models/channels.model'
import { ChannelMember } from '@/models/channelMemebers.model'
import { Op } from 'sequelize'

class ChannelService {
  private channels = Channel
  private chnnelMembers = ChannelMember

  public async findAllChannel({ limit, offset, userId }: ChannelQueryI): Promise<ChannelI[]> {
    const userChannels = await this.chnnelMembers.findAll({ where: { userId }, raw: true, attributes: ['channelId'] })
    const userChannelIds = userChannels.map(({ channelId }) => channelId)

    const channels: ChannelI[] = await this.channels.findAll({
      where: { channelId: { [Op.in]: userChannelIds } },
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

  public async updateChannel(channelId: number, userData: ChannelCreationI): Promise<ChannelI> {
    const foundChannel: ChannelI = await this.channels.findByPk(channelId)
    if (!foundChannel) throw new HttpException(409, "You're not user")

    await this.channels.update({ ...userData }, { where: { channelId } })

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
