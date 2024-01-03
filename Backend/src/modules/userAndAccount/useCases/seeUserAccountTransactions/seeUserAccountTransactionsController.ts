import { FastifyReply, FastifyRequest } from "fastify";
// import { z, ZodError } from "zod";
// import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists-error";

// import { makeRegisterUserAndAccountUseCase } from "../factories/makeRegisterUserAndAccountUseCase";
// import { makeSeeUserBalanceUseCase } from "../factories/makeSeeUserBalanceUseCase";
import { makeSeeUserAccountTransactionsUseCase } from "../factories/makeSeeUserAccountTransactionsUseCase";

export async function seeUserAccountTransactionsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const seeUserAccountTransactionsUseCase = makeSeeUserAccountTransactionsUseCase();

  const { transactions } = await seeUserAccountTransactionsUseCase.execute({
    accountId: request.user.accountId,
  });  
  
  // Mapeie as transações para incluir informações sobre "cash in" ou "cash out"
  const enrichedTransactions = transactions.map((transaction) => {
    return {
      ...transaction,
      type: transaction.debitedAccountId === request.user.accountId ? 'cash out' : 'cash in',
    };
  });

  return reply.status(200).send({
    enrichedTransactions,
  });
}
