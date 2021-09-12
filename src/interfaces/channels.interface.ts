export interface ChannelI {
  channelId: string
  channelName: string
  channelDescription?: string
  creatorId?: string
}

export interface ChannelQueryI {
  limit?: number
  offset?: number
  userId?: string
  searchQuery?: string
}
