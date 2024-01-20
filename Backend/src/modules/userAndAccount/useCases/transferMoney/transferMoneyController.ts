import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeTransferMoneyUseCase } from "../factories/makeTransferMoneyUseCase";
import { SameAccountTransactionError } from "@/shared/errors/same-account-in-transaction-error";
import { InsufficientBalanceError } from "@/shared/errors/insufficient-balance-error";
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-error";

export async function transferMoneyController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const transferMoneyBodySchema = z.object({
    targetUsername: z.string().min(1, { message: "You need to transfer to someone" }),
    amount: z
    .string().min(1).transform(
      value => parseFloat(value)
    ).refine(
      value => value > 0, { message: "Amount needs to be a positive number" }
    ).refine(
      value => !isNaN(value), { message: "Amount needs to be a number" }
    )
  });


  const transferMoneyUseCase = makeTransferMoneyUseCase();

  const sourceAccountId = request.user.accountId;
  const { targetUsername, amount } = transferMoneyBodySchema.parse(request.body);

  try {
    await transferMoneyUseCase.execute({
      sourceAccountId,
      targetUsername,
      amount,
    });
  
    return reply
      .status(200)
      .send({ message: "Transfer completed successfully." });
  } catch (err) {
    if (err instanceof SameAccountTransactionError) {
      return reply.status(409).send({ message: err.message });
    }
    if (err instanceof InsufficientBalanceError) {
      return reply.status(409).send({ message: err.message });
    }
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }
    
  }
 
}
