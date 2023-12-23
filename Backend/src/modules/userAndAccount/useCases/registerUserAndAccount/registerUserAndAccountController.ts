import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error'
import { makeRegisterUserAndAccountUseCase } from '@/use-cases/factories/makeRegisterUserAndAccountUseCase'

export async function registerUserAndAccountController(request: FastifyRequest, reply: FastifyReply) {
  const registerUserAndAccountBodySchema = z.object({
    username: z.string().min(3, {message: 'username needs to be at least 3 characters'}),
    password: z.string().min(6),
  })

  const { username, password } = registerUserAndAccountBodySchema.parse(request.body)

  try {
    const registerUserAndAccountUseCase = makeRegisterUserAndAccountUseCase()

    await registerUserAndAccountUseCase.execute({
      username,
      password
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
