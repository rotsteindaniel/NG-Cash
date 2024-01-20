import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-error";
import { IUserAndAccountRepository } from "../../repositories/IUserAndAccountRepository";
import { InsufficientBalanceError } from "@/shared/errors/insufficient-balance-error";
import { SameAccountTransactionError } from "@/shared/errors/same-account-in-transaction-error";

interface TransferMoneyUseCaseRequest {
  sourceAccountId: string;
  targetUsername: string;
  amount: number;
}

export class TransferMoneyUseCase {
  constructor(private usersAndAccountRepository: IUserAndAccountRepository) {}

  async execute({
    sourceAccountId,
    targetUsername,
    amount,
  }: TransferMoneyUseCaseRequest): Promise<void> {

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

    if (!sourceAccount || !targetAccount) {
      throw new ResourceNotFoundError();
    }

    if (sourceAccountId === targetAccountId) {
      throw new SameAccountTransactionError();
    }


    if (sourceAccount.balance < amount) {
      throw new InsufficientBalanceError();
    }

    const sourceNewBalance = (sourceAccount.balance -= amount);
    const targetNewBalance = (targetAccount.balance += amount);

    await this.usersAndAccountRepository.updateBalance(
      sourceAccount.id,
      sourceNewBalance
    );
    await this.usersAndAccountRepository.updateBalance(
      targetAccount.id,
      targetNewBalance
    );

    await this.usersAndAccountRepository.createTransaction({
      creditedAccount: { connect: { id: targetAccount.id } },
      debitedAccount: { connect: { id: sourceAccount.id } },
      value: amount,
      createdAt: new Date(),
    });
  }
}
