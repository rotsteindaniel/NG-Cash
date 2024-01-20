import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/env'
import { usersRoutes } from '@/shared/infra/http/routes/users.routes'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCookie)

app.register(usersRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})