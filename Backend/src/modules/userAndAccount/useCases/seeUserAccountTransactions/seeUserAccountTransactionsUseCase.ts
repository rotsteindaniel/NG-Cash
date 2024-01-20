import { IUserAndAccountRepository } from "../../repositories/IUserAndAccountRepository";
import { Transaction } from "@prisma/client";

interface SeeUserAccountTransactionsUseCaseRequest {
  accountId: string;
}

interface SeeUserAccountTransactionsUseCaseResponse {
  transactions: Transaction[];
}

export class SeeUserAccountTransactionsUseCase {
  constructor(private usersAndAccountRepository: IUserAndAccountRepository) {}

  async execute({
    accountId,
  }: SeeUserAccountTransactionsUseCaseRequest): Promise<SeeUserAccountTransactionsUseCaseResponse> {
    const transactions = await this.usersAndAccountRepository.findTransactionsByAccountId(accountId);

    return {
      transactions,
    };
  }
}
