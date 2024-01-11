import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-error";
import { IUserAndAccountRepository } from "../../repositories/IUserAndAccountRepository";
import { Transaction } from "@prisma/client";
import { InsufficientBalanceError } from "@/shared/errors/insufficient-balance-error";
import { SameAccountTransactionError } from "@/shared/errors/same-account-in-transaction-error";
import { prisma } from "@/lib/prisma";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// import { User } from "@prisma/client";

interface TransferMoneyUseCaseRequest {
  sourceAccountId: string;
  targetUsername: string;
  amount: number;
}

// interface TransferMoneyUseCaseResponse {
//   transactions: Transaction[];
// }

export class TransferMoneyUseCase {
  constructor(private usersAndAccountRepository: IUserAndAccountRepository) {}

  async execute({
    sourceAccountId,
    targetUsername,
    amount,
  }: TransferMoneyUseCaseRequest): Promise<void> {
    // const transactions = await this.usersAndAccountRepository.findTransactionsByAccountId(accountId);

    const sourceAccount = await this.usersAndAccountRepository.findByAccountId(
      sourceAccountId
    );
    const targetUser = await this.usersAndAccountRepository.findByUsername(
      targetUsername
    );
    const targetAccountId = targetUser?.accountId ?? "";
    const targetAccount = await this.usersAndAccountRepository.findByAccountId(
      targetAccountId
    );

    // Verificar se as contas existem
    if (!sourceAccount || !targetAccount) {
      throw new ResourceNotFoundError();
    }

    // Verificar se está tentando transferir para a própria conta
    if (sourceAccountId === targetAccountId) {
      throw new SameAccountTransactionError();
    }

    // Lógica de transferência de dinheiro (debitar da conta de sourceUser e creditar na conta de targetUser)
    // Certifique-se de tratar casos onde o saldo não é suficiente, etc.

    // Exemplo (esta lógica pode variar dependendo dos requisitos do seu sistema):
    if (sourceAccount.balance < amount) {
      throw new InsufficientBalanceError();
    }

    const sourceNewBalance = (sourceAccount.balance -= amount);
    const targetNewBalance = (targetAccount.balance += amount);

    // Atualizar as contas no banco de dados
    await this.usersAndAccountRepository.updateBalance(
      sourceAccount.id,
      sourceNewBalance
    );
    await this.usersAndAccountRepository.updateBalance(
      targetAccount.id,
      targetNewBalance
    );

    // // Criar transação
    // await prisma.transaction.create({
    //   data: {
    //     creditedAccount: { connect: { id: targetAccount.id } },
    //     debitedAccount: { connect: { id: sourceAccount.id } },
    //     value: amount,
    //     createdAt: new Date(),
    //   },
    // });

    // const creditedAccount = await prisma.account.findUnique({
    //   where: { id: targetAccount.id },
    // });

    // const debitedAccount = await prisma.account.findUnique({
    //   where: { id: sourceAccount.id },
    // });

    // if (!creditedAccount || !debitedAccount) {
    //   throw new ResourceNotFoundError();
    // }

    // Criar transação
    await this.usersAndAccountRepository.createTransaction({
      creditedAccount: { connect: { id: targetAccount.id } },
      debitedAccount: { connect: { id: sourceAccount.id } },
      value: amount,
      createdAt: new Date(),
    });
  }
}
