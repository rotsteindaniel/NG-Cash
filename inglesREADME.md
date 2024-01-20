# App

NG.CASH

## Backend

- [x] Docker is required.
- [x] Node.js server using Typescript.
- [x] Prisma ORM (any ORM can be chosen).
- [x] Application data needs to be persisted in a PostgreSQL database.

## Frontend

- [x] React or Next.js using Typescript.
- [x] CSS3 or a styling library of your preference (I am using Ant Desing to practice).
- [x] Page for NG registration providing username and password.
- [x] Page for user login providing username and password.

### Main Page should include:

- [x] Current user balance.
- [x] Section for making transfers to other NG users using the username of the payee.
- [x] Table with details of all transactions the user participated in.
- [x] Mechanism to filter the table by transaction (cash-in/cash-out transactions).
- [x] Logout button.

## Functional Requirements (FRs) Backend

- [x] It should be possible to register a User (provide username, password for registration).
- [x] It should be possible to log in a User (provide username, password for login).
- [x] (after login) It should be possible to view the user's balance.
- [x] (after login) It should be possible to view a table with details of all transactions the user participated in.
- [x] (after login) It should be possible to transfer to other NG users using the username of the payee.
- [x] (after login) It should be possible to filter the table by transaction (cash-in/cash-out transactions). (the filter will be implemented on the frontend)
- [x] (after login) It should be possible to log out.

## Functional Requirements (FRs) Frontend

- [x] It should be possible to register a User (provide username, password for registration).
- [x] It should be possible to log in a User (provide username, password for login).
- [x] (after login) It should be possible to view the user's balance.
- [x] (after login) It should be possible to view a table with details of all transactions the user participated in.
- [x] (after login) It should be possible to transfer to other NG users using the username of the payee.
- [x] (after login) It should be possible to filter the table by transaction (cash-in/cash-out transactions).
- [x] (after login) It should be possible to log out.

## Business Rules (BRs) Backend

- [x] Username must be unique.
- [x] Username must be at least 3 characters long.
- [x] Password must be at least 8 characters long, containing at least one number and one uppercase letter.
- [x] (after registration) Automatically creates 1 account in the account table with a balance of R$100.
- [x] (after login) Can perform cash-out by providing the username of the user who will receive the cash-in.
- [x] (after login) Should be able to view financial transactions (cash-out and cash-in) they participated in.
- [x] If the user did not participate in a particular transaction, they should never have access to it.
- [x] (after login) Can filter financial transactions they participated in by:
      Cash-out transactions
      Cash-in transactions.
- [x] Can only cash-out if they have sufficient balance.
- [x] User should not have the possibility to transfer to themselves.
- [x] Every successful new transaction should be recorded in the Transactions table.
- [x] In cases of transactional failures, the Transactions table should not be affected.

## Business Rules (BRs) Frontend

- [x] Username must be unique.
- [x] Username must be at least 3 characters long.
- [x] Password must be at least 8 characters long, containing at least one number and one uppercase letter.
- [x] (after registration) Automatically creates 1 account in the account table with a balance of R$100.
- [x] (after login) Can perform cash-out by providing the username of the user who will receive the cash-in.
- [x] (after login) Should be able to view financial transactions (cash-out and cash-in) they participated in.
- [x] If the user did not participate in a particular transaction, they should never have access to it.
- [x] (after login) Can filter financial transactions they participated in by:
      Cash-out transactions
      Cash-in transactions.
- [x] Can only cash-out if they have sufficient balance.
- [x] User should not have the possibility to transfer to themselves.
- [x] Every successful new transaction should be recorded in the Transactions table.
- [x] In cases of transactional failures, the Transactions table should not be affected.

## Non-Functional Requirements (NFRs) Backend

- [x] User password needs to be encrypted when stored in the Database.
- [x] The user should be identified by a JWT after logging in (JSON Web Token) (with a validity of 24 hours).

## Non-Functional Requirements (NFRs) Frontend

- [x] User password needs to be encrypted when stored in the Database.
- [x] The user should be identified by a JWT after logging in (JSON Web Token) (with a validity of 24 hours).
