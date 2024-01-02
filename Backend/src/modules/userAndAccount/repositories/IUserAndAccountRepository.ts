import { Prisma, User, Account } from '@prisma/client'

export interface IUserAndAccountRepository {
  findById(id: string): Promise<User | null>
  findByAccountId(id: string): Promise<Account | null>
  findByUsername(username: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
