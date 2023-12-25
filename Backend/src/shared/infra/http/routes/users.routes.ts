import { FastifyInstance } from 'fastify'

// import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { authenticateUserAndAccountController } from '@/modules/userAndAccount/useCases/authenticateUserAndAccount/authenticateUserAndAccountController'
// import { profile } from './profile'
import { registerUserAndAccountController } from '@/modules/userAndAccount/useCases/registerUserAndAccount/registerUserAndAccountController'
// import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUserAndAccountController)
  app.post('/sessions', authenticateUserAndAccountController)

  // app.patch('/token/refresh', refresh)

  /** Authenticated */
  // app.get('/me', { onRequest: [verifyJwt] }, profile)
}
