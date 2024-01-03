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

  return reply.status(200).send({
    transactions,
  });
}
