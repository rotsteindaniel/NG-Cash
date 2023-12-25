import { AuthenticateUserAndAccountUseCase } from '../authenticateUserAndAccount/authenticateUserAndAccountUseCase'
import { PrismaUsersAndAccountRepository } from '../../repositories/prisma/prismaUsersAndAccountRepository'

export function makeAuthenticateUserAndAccountUseCase() {
  const usersAndAccountRepository = new PrismaUsersAndAccountRepository()
  const authenticateUserAndAccountUseCase = new AuthenticateUserAndAccountUseCase(usersAndAccountRepository)

  return authenticateUserAndAccountUseCase
}
