import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
// import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists-error";

// import { makeRegisterUserAndAccountUseCase } from "../factories/makeRegisterUserAndAccountUseCase";
// import { makeSeeUserBalanceUseCase } from "../factories/makeSeeUserBalanceUseCase";
import { makeTransferMoneyUseCase } from "../factories/makeTransferMoneyUseCase";
import { SameAccountTransactionError } from "@/shared/errors/same-account-in-transaction-error";
import { InsufficientBalanceError } from "@/shared/errors/insufficient-balance-error";
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-error";

export async function transferMoneyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // const transferMoneyBodySchema = z.object({
  //   targetUsername: z.string().min(3, { message: "Username needs to be at least 3 characters" }),
  //   amount: z
  //     .number()
  //     .refine(value => value > 0, { message: "Amount needs to be a positive number" }),
  // });

  const transferMoneyBodySchema = z.object({
    targetUsername: z.string().min(3, { message: "Username needs to be at least 3 characters" }),
    amount: z
      .string()
      .refine(value => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue > 0;
      }, { message: "Amount needs to be a positive number" }),
  });


  const transferMoneyUseCase = makeTransferMoneyUseCase();

  const sourceAccountId = request.user.accountId;
  const { targetUsername, amount } = transferMoneyBodySchema.parse(request.body);

  try {
    await transferMoneyUseCase.execute({
      sourceAccountId,
      targetUsername,
      amount: parseFloat(amount),
    });
  
    return reply
      .status(200)
      .send({ message: "Transferência realizada com sucesso." });
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
