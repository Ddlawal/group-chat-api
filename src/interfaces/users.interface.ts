export interface UserI {
  userId: string
  email: string
  firstName: string
  lastName: string
  fullName: string
}

export interface UsersPasswordI {
  usersPasswordId: string
  password: string
  userId: string
}

export interface UserQueryI {
  limit?: number
  offset?: number
  channelId?: string
}
