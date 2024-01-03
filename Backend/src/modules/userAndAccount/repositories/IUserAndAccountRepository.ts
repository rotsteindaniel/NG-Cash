import { Prisma, User, Account, Transaction } from '@prisma/client'

export interface IUserAndAccountRepository {
  findById(id: string): Promise<User | null>
  findByAccountId(accountId: string): Promise<Account | null>
  findTransactionsByAccountId(id: string): Promise<Transaction[]>
  updateBalance(id: string, newBalance: number): Promise<void>;
  findByUsername(username: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
