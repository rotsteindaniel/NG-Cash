import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error'
import { makeAuthenticateUserAndAccountUseCase } from '../factories/makeAuthenticateUserAndAccountUseCase'

export async function authenticateUserAndAccountController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    username: z.string(),
    password: z.string().min(6),
  })

  const { username, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUserAndAccountUseCase = makeAuthenticateUserAndAccountUseCase()

    const { user } = await authenticateUserAndAccountUseCase.execute({
      username,
      password,
    })

    const token = await reply.jwtSign(
      // {
      //   role: user.role,
      // },
      {
        sign: {
          sub: user.id,
          expiresIn: '1d',
        },
      },
    )

    // const refreshToken = await reply.jwtSign(
    //   {
    //     role: user.role,
    //   },
    //   {
    //     sign: {
    //       sub: user.id,
    //       expiresIn: '7d',
    //     },
    //   },
    // )

    return reply
      // .setCookie('refreshToken', refreshToken, {
      //   path: '/',
      //   secure: true,
      //   sameSite: true,
      //   httpOnly: true,
      // })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
