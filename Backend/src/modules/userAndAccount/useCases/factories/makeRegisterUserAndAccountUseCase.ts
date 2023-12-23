import { PrismaUsersAndAccountRepository } from "../../repositories/prisma/prismaUsersAndAccountRepository"
import { RegisterUserAndAccountUseCase } from "../registerUserAndAccount/registerUserAndAccountUseCase"

export function makeRegisterUserAndAccountUseCase() {
  const usersAndAccountRepository = new PrismaUsersAndAccountRepository()
  const registerUserAndAccountUseCase = new RegisterUserAndAccountUseCase(usersAndAccountRepository)

  return registerUserAndAccountUseCase
}
