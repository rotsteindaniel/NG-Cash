import { UsersAndAccountRepository } from '@/repositories/users-and-account-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  username: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersAndAccountRepository: UsersAndAccountRepository) {}

  async execute({
    username,
    password
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameUsername = await this.usersAndAccountRepository.findByUsername(username)

    if (userWithSameUsername) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersAndAccountRepository.create({
      username,
      password_hash,
    })

    return {
      user,
    }
  }
}
