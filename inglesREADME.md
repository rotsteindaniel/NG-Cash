# App

NG.CASH

## Backend

- [ ] Docker is required.
- [ ] Node.js server using Typescript.
- [ ] Prisma ORM (any ORM can be chosen).
- [ ] Application data needs to be persisted in a PostgreSQL database.

## Frontend

- [ ] React or Next.js using Typescript.
- [ ] CSS3 or a styling library of your preference.
- [ ] Page for NG registration providing username and password.
- [ ] Page for user login providing username and password.

### Main Page should include:

- [ ] Current user balance.
- [ ] Section for making transfers to other NG users using the username of the payee.
- [ ] Table with details of all transactions the user participated in.
- [ ] Mechanism to filter the table by transaction date and/or cash-in/cash-out transactions.
- [ ] Logout button.

## Functional Requirements (FRs)

- [ ] It should be possible to register a User (provide username, password for registration).
- [ ] It should be possible to log in a User (provide username, password for login).
- [ ] (after login) It should be possible to view the user's balance.
- [ ] (after login) It should be possible to view a table with details of all transactions the user participated in.
- [ ] (after login) It should be possible to transfer to other NG users using the username of the payee.
- [ ] (after login) It should be possible to filter the table by transaction date and/or cash-in/cash-out transactions.
- [ ] (after login) It should be possible to log out.

## Business Rules (BRs)

- [ ] Username must be unique.
- [ ] Username must be at least 3 characters long.
- [ ] Password must be at least 8 characters long, containing at least one number and one uppercase letter.
- [ ] (after registration) Automatically creates 1 account in the account table with a balance of R$100.
- [ ] (after login) Can perform cash-out by providing the username of the user who will receive the cash-in.
- [ ] (after login) Should be able to view financial transactions (cash-out and cash-in) they participated in.
- [ ] If the user did not participate in a particular transaction, they should never have access to it.
- [ ] (after login) Can filter financial transactions they participated in by:
      Transaction date
      and/or
      Cash-out transactions
      Cash-in transactions.
- [ ] Can only cash-out if they have sufficient balance.
- [ ] User should not have the possibility to transfer to themselves.
- [ ] Every successful new transaction should be recorded in the Transactions table.
- [ ] In cases of transactional failures, the Transactions table should not be affected.

## Non-Functional Requirements (NFRs)

- [ ] User password needs to be encrypted when stored in the Database.
- [ ] The user should be identified by a JWT after logging in (JSON Web Token) (with a validity of 24 hours).
