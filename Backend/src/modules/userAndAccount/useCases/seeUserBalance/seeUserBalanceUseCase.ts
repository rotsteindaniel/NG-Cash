import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-error";
import { IUserAndAccountRepository } from "../../repositories/IUserAndAccountRepository";
// import { User } from "@prisma/client";

interface SeeUserBalanceUseCaseRequest {
  accountId: string;
}

interface SeeUserBalanceUseCaseResponse {
  balance: number;
}

export class SeeUserBalanceUseCase {
  constructor(private usersAndAccountRepository: IUserAndAccountRepository) {}

  async execute({
    accountId,
  }: SeeUserBalanceUseCaseRequest): Promise<SeeUserBalanceUseCaseResponse> {
    // const user = await this.usersAndAccountRepository.findById(userId);
    const account = await this.usersAndAccountRepository.findByAccountId(accountId);

    if (!account) {
      throw new ResourceNotFoundError();
    }

    const balance = account.balance;

    return {
      balance,
    };
  }
}
