import { FastifyReply, FastifyRequest } from "fastify";
import { makeSeeUserBalanceUseCase } from "../factories/makeSeeUserBalanceUseCase";

export async function seeUserBalanceController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const seeUserAccountTransactionsUseCase = makeSeeUserBalanceUseCase();

  const { username, balance } = await seeUserAccountTransactionsUseCase.execute({
    userId: request.user.sub,
    accountId: request.user.accountId,
  });

  return reply.status(200).send({
    username,
    balance,
  });
}
