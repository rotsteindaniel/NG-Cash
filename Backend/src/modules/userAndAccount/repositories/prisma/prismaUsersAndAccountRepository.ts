import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { IUserAndAccountRepository } from '../IUserAndAccountRepository'

export class PrismaUsersAndAccountRepository implements IUserAndAccountRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByAccountId(id: string) {
    const account = await prisma.account.findUnique({
      where: {
        id,
      },
    })

    return account
  }

  async findTransactionsByAccountId(id: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          { creditedAccountId: id },
          { debitedAccountId: id },
        ],
      },
    })

    return transactions
  }

  async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
