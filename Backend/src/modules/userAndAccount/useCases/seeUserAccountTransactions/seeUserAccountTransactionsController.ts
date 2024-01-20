import { FastifyReply, FastifyRequest } from "fastify";
// import { z, ZodError } from "zod";
// import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists-error";

// import { makeRegisterUserAndAccountUseCase } from "../factories/makeRegisterUserAndAccountUseCase";
// import { makeSeeUserBalanceUseCase } from "../factories/makeSeeUserBalanceUseCase";
import { makeSeeUserAccountTransactionsUseCase } from "../factories/makeSeeUserAccountTransactionsUseCase";
import { prisma } from "@/lib/prisma";
import { PrismaUsersAndAccountRepository } from "../../repositories/prisma/prismaUsersAndAccountRepository";
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
  //  const repository = new PrismaUsersAndAccountRepository();

  // const creditedUser = await repository.findUserByAccountId(transaction.creditedAccountId);
  // console.log('Credited User:', creditedUser);
  // const debitedUser = await repository.findUserByAccountId(transaction.debitedAccountId);
  // console.log('Debited User:', debitedUser);
  const dataBrasil = dayjs(transaction.createdAt).locale('pt-br');
  return {
    ...transaction,
    type: transaction.debitedAccountId === request.user.accountId ? 'cash out' : 'cash in',
    createdAt: dataBrasil.format('DD/MM/YYYY HH:mm:ss')
    // creditedUsername: creditedUser?.username,
    // debitedUsername: debitedUser?.username,
  };
}));

return reply.status(200).send({
  enrichedTransactions,
});
}

