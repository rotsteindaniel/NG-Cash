export class SameAccountTransactionError extends Error {
  constructor() {
    super(
      'You cannot transfer money to your account.',
    )
  }
}
