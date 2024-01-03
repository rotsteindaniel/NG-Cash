import { PrismaUsersAndAccountRepository } from "../../repositories/prisma/prismaUsersAndAccountRepository"
import { TransferMoneyUseCase } from "../transferMoney/transferMoneyUseCase"

export function makeTransferMoneyUseCase() {
  const usersAndAccountRepository = new PrismaUsersAndAccountRepository()
  const transferMoneyUseCaseUseCase = new TransferMoneyUseCase(usersAndAccountRepository)

  return transferMoneyUseCaseUseCase
}
