import { Prisma, User } from '@prisma/client'

export interface UsersAndAccountRepository {
  findById(id: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
