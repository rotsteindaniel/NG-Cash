import { IUserAndAccountRepository } from '../IUserAndAccountRepository'
import { User, Prisma } from '@prisma/client'

export class InMemoryUserAndAccountRepository implements IUserAndAccountRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByUsername(username: string) {
    const user = this.items.find((item) => item.username === username)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: JSON.stringify(Math.random()),
      username: data.username,
      password_hash: data.password_hash,
    }

    this.items.push(user)

    return user
  }
}
