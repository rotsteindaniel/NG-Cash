import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { IUserAndAccountRepository } from '../../repositories/IUserAndAccountRepository'

interface AuthenticateUserAndAccountUseCaseRequest {
  username: string
  password: string
}

interface AuthenticateUserAndAccountUseCaseResponse {
  user: User
}

export class AuthenticateUserAndAccountUseCase {
  constructor(private authenticateUserAndAccountRepository: IUserAndAccountRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateUserAndAccountUseCaseRequest): Promise<AuthenticateUserAndAccountUseCaseResponse> {
    const user = await this.authenticateUserAndAccountRepository.findByUsername(username)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
