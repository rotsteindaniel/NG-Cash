import { PrismaUsersAndAccountRepository } from "../../repositories/prisma/prismaUsersAndAccountRepository"
import { SeeUserBalanceUseCase } from "../seeUserBalance/seeUserBalanceUseCase"

export function makeSeeUserBalanceUseCase() {
  const usersAndAccountRepository = new PrismaUsersAndAccountRepository()
  const seeUserBalanceUseCase = new SeeUserBalanceUseCase(usersAndAccountRepository)

  return seeUserBalanceUseCase
}
