import { Prisma, User } from '@prisma/client'

export interface IUserAndAccountRepository {
  findById(id: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
