import { FastifyReply, FastifyRequest } from "fastify";
import { makeSeeUserAccountTransactionsUseCase } from "../factories/makeSeeUserAccountTransactionsUseCase";
import dayjs from "dayjs";


export async function seeUserAccountTransactionsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const seeUserAccountTransactionsUseCase = makeSeeUserAccountTransactionsUseCase();

  const { transactions } = await seeUserAccountTransactionsUseCase.execute({
    accountId: request.user.accountId,
  });  

 // Mapeie as transações para incluir informações sobre "cash in" ou "cash out" e nomes de usuário
 const enrichedTransactions = await Promise.all(transactions.map(async (transaction) => {
  const dataBrasil = dayjs(transaction.createdAt).locale('pt-br');
  return {
    ...transaction,
    type: transaction.debitedAccountId === request.user.accountId ? 'cash out' : 'cash in',
    createdAt: dataBrasil.format('DD/MM/YYYY HH:mm:ss')
  };
}));

return reply.status(200).send({
  enrichedTransactions,
});
}

