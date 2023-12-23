import { FastifyInstance } from 'fastify'

// import { verifyJwt } from '@/http/middlewares/verify-jwt'

// import { authenticate } from './authenticate'
// import { profile } from './profile'
import { registerUserAndAccountController } from '../../../../use-cases/registerUserAndAccount/registerUserAndAccountController'
// import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUserAndAccountController)
  // app.post('/sessions', authenticate)

  // app.patch('/token/refresh', refresh)

  /** Authenticated */
  // app.get('/me', { onRequest: [verifyJwt] }, profile)
}