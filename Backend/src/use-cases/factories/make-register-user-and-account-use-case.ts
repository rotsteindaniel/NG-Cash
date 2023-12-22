import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUserAndAccountUseCase() {
  const usersAndAccountRepository = new PrismaUsersRepository()
  const registerUserAndAccountUseCase = new RegisterUseCase(usersAndAccountRepository)

  return registerUserAndAccountUseCase
}
