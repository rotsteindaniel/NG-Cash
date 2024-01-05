import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { IUserAndAccountRepository } from "../IUserAndAccountRepository";

export class PrismaUsersAndAccountRepository
  implements IUserAndAccountRepository
{
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByAccountId(id: string) {
    const account = await prisma.account.findUnique({
      where: {
        id,
      },
    });

    return account;
  }

  async findTransactionsByAccountId(id: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ creditedAccountId: id }, { debitedAccountId: id }],
      },
    });

    return transactions;
  }

  async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async updateBalance(id: string, newBalance: number) {
    await prisma.account.update({
      where: {
        id,
      },
      data: {
        balance: newBalance,
      },
    });
  }

  async createTransaction(data: Prisma.TransactionCreateInput): Promise<void> {
    await prisma.transaction.create({
      data,
    });
  }

  // Função para buscar informações do usuário com base no ID da conta
  //  async findUserByAccountId(accountId: string) {
  //   const user = await prisma.user.findUnique({
  //     where: { id: accountId },
  //   });

  //   return user;
  // }
}
