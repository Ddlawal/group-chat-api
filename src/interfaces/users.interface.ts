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
