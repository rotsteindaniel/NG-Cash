import { FastifyReply, FastifyRequest } from "fastify";
// import { z, ZodError } from "zod";
// import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists-error";

// import { makeRegisterUserAndAccountUseCase } from "../factories/makeRegisterUserAndAccountUseCase";
import { makeSeeUserBalanceUseCase } from "../factories/makeSeeUserBalanceUseCase";

export async function seeUserBalanceController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const seeUserBalanceUseCase = makeSeeUserBalanceUseCase();

  const { balance } = await seeUserBalanceUseCase.execute({
    accountId: request.user.accountId,
  });

  return reply.status(200).send({
    balance,
  });
}
