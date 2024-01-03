import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'

import { authenticateUserAndAccountController } from '@/modules/userAndAccount/useCases/authenticateUserAndAccount/authenticateUserAndAccountController'
// import { profile } from './profile'
import { registerUserAndAccountController } from '@/modules/userAndAccount/useCases/registerUserAndAccount/registerUserAndAccountController'
import { seeUserBalanceController } from '@/modules/userAndAccount/useCases/seeUserBalance/seeUserBalanceController'
import { seeUserAccountTransactionsController } from '@/modules/userAndAccount/useCases/seeUserAccountTransactions/seeUserAccountTransactionsController'
import { transferMoneyController } from '@/modules/userAndAccount/useCases/transferMoney/transferMoneyController'
// import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUserAndAccountController)
  app.post('/sessions', authenticateUserAndAccountController)

  // app.patch('/token/refresh', refresh)

  /** Authenticated */
  // app.get('/me', { onRequest: [verifyJwt] }, profile)

  app.get('/user/balance', { onRequest: [verifyJwt] }, seeUserBalanceController)
  app.get('/user/transactions', { onRequest: [verifyJwt] }, seeUserAccountTransactionsController)
  app.post('/user/transfer', { onRequest: [verifyJwt] }, transferMoneyController)
}
