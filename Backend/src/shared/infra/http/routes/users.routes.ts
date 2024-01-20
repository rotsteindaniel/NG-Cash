import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'

import { authenticateUserAndAccountController } from '@/modules/userAndAccount/useCases/authenticateUserAndAccount/authenticateUserAndAccountController'
import { registerUserAndAccountController } from '@/modules/userAndAccount/useCases/registerUserAndAccount/registerUserAndAccountController'
import { seeUserBalanceController } from '@/modules/userAndAccount/useCases/seeUserBalance/seeUserBalanceController'
import { seeUserAccountTransactionsController } from '@/modules/userAndAccount/useCases/seeUserAccountTransactions/seeUserAccountTransactionsController'
import { transferMoneyController } from '@/modules/userAndAccount/useCases/transferMoney/transferMoneyController'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUserAndAccountController)
  app.post('/sessions', authenticateUserAndAccountController)
  
  /** Authenticated */
  app.get('/user/balance', { onRequest: [verifyJwt] }, seeUserBalanceController)
  app.get('/user/transactions', { onRequest: [verifyJwt] }, seeUserAccountTransactionsController)

  app.post('/user/transfer', { onRequest: [verifyJwt] }, transferMoneyController)
}
