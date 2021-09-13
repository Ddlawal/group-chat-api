export interface MessageI {
  messageid: string
  message: string
  userId: string
  channelId: string
}

export interface MessageQueryI {
  limit?: number
  offset?: number
  channelId?: string
}
