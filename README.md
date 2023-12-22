# App

NG.CASH

## Backend

- [ ] Precisa usar Docker;
- [ ] Um servidor em Node.js utilizando Typescript;
- [ ] Prisma ORM (poderia escolher qualquer um);
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;

## Frontend

- [ ] React ou Next utilizando Typescript;
- [ ] CSS3 ou uma biblioteca de estilização de sua preferência;
- [ ] Página para realizar o cadastro na NG informando username e password.
- [ ] Página para realizar o login informando username e password.

### Página principal deve apresentar:

- [ ] Balance atual do usuário;
- [ ] Seção voltada à realização de transferências para outros usuários NG a partir do username de quem sofrerá o cash-in;
- [ ] Tabela com os detalhes de todas as transações que o usuário participou;
- [ ] Mecanismo para filtrar a tabela por data de transação e/ou transações do tipo cash-in/cash-out;
- [ ] Botão para realizar o log-out;

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar um User (informe username, password para cadastrar);
- [ ] Deve ser possível logar um User (informe username, password para cadastrar);
- [ ] (depois de logado) Deve ser possível ver balance do User
- [ ] (depois de logado) Deve ser possível ver Tabela com os detalhes de todas as transações que o usuário participou
- [ ] (depois de logado) Deve ser possível transferir para outros usuários NG a partir do username de quem sofrerá o cash-in
- [ ] (depois de logado) Deve ser possível filtrar a tabela por data de transação e/ou transações do tipo cash-in/cash-out;
- [ ] (depois de logado) Deve ser possível realizar logOut

## RNs (Regras de negócio)

- [ ] username tem que ser único;
- [ ] username composto por, pelo menos, 3 caracteres;
- [ ] password composta por pelo menos 8 caracteres, um número e uma letra maiúscula;
- [ ] (depois cadastro), automaticamente cria 1 account, na tabela account com R$100 de balance;
- [ ] (depois de logado) pode fazer cash-out informando o username do usuário que sofrerá o cash-in;
- [ ] (depois de logado) deverá ser capaz de visualizar as transações financeiras (cash-out e cash-in) que participou;
- [ ] Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela;
- [ ] Todo usuário logado deverá ser capaz de filtrar as transações financeiras que participou por:
      Data de realização da transação
      e/ou
      Transações de _cash-out;_
      Transações de _cash-in._
- [ ] Só pode cash-out se tiver balance suficiente para isso;
- [ ] Usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo;
- [ ] Toda nova transação bem-sucedida deverá ser registrada na tabela Transactions;
- [ ] Em casos de falhas transacionais, a tabela Transactions não deverá ser afetada;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada ao armazenar no Banco de Dados;
- [ ] O usuário deve ser identificado por um JWT depois de se logar (JSON Web Token) (com 24h de validade);
