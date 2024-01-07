import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-error";
import { IUserAndAccountRepository } from "../../repositories/IUserAndAccountRepository";
// import { User } from "@prisma/client";

interface SeeUserBalanceUseCaseRequest {
  userId: string;
  accountId: string;
}

interface SeeUserBalanceUseCaseResponse {
  username: string;
  balance: number;
}

export class SeeUserBalanceUseCase {
  constructor(private usersAndAccountRepository: IUserAndAccountRepository) {}

  async execute({
    userId,
    accountId,
  }: SeeUserBalanceUseCaseRequest): Promise<SeeUserBalanceUseCaseResponse> {
    const user = await this.usersAndAccountRepository.findById(userId);
    const username = user?.username;
    const account = await this.usersAndAccountRepository.findByAccountId(accountId);

    if (!user) {
      throw new ResourceNotFoundError();
    }
    if (!username) {
      throw new ResourceNotFoundError();
    }
    if (!account) {
      throw new ResourceNotFoundError();
    }

    const balance = account.balance;

    return {
      username,
      balance
    };
  }
}
