import { PrismaUsersAndAccountRepository } from "../../repositories/prisma/prismaUsersAndAccountRepository"
import { SeeUserAccountTransactionsUseCase } from "../seeUserAccountTransactions/seeUserAccountTransactionsUseCase"

export function makeSeeUserAccountTransactionsUseCase() {
  const usersAndAccountRepository = new PrismaUsersAndAccountRepository()
  const seeUserAccountTransactionsUseCase = new SeeUserAccountTransactionsUseCase(usersAndAccountRepository)

  return seeUserAccountTransactionsUseCase
}
