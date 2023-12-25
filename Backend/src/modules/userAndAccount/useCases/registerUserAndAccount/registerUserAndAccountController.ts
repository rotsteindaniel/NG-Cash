import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists-error";

import { makeRegisterUserAndAccountUseCase } from "../factories/makeRegisterUserAndAccountUseCase";

export async function registerUserAndAccountController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerUserAndAccountBodySchema = z.object({
    username: z
      .string()
      .min(3, { message: "username needs to be at least 3 characters" }),
    password: z
      .string()
      .min(8, { message: "password needs to be at least 8 characters" })
      .refine((value) => /[0-9]/.test(value), {
        message: "password must contain at least one number",
      })
      .refine((value) => /[A-Z]/.test(value)),
  });

  const { username, password } = registerUserAndAccountBodySchema.parse(
    request.body
  );

  try {
    const registerUserAndAccountUseCase = makeRegisterUserAndAccountUseCase();

    await registerUserAndAccountUseCase.execute({
      username,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
  }

  return reply.status(201).send();
}
