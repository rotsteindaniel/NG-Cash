# App

NG.CASH

## Backend

- [x] Precisa usar Docker;
- [x] Um servidor em Node.js utilizando Typescript;
- [x] Prisma ORM (poderia escolher qualquer um);
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;

## Frontend

- [x] React ou Next utilizando Typescript;
- [x] CSS3 ou uma biblioteca de estilização de sua preferência; (usando Ant Desing para testar)
- [x] Página para realizar o cadastro na NG informando username e password.
- [x] Página para realizar o login informando username e password.

### Página principal deve apresentar:

- [ ] Balance atual do usuário;
- [ ] Seção voltada à realização de transferências para outros usuários NG a partir do username de quem sofrerá o cash-in;
- [ ] Tabela com os detalhes de todas as transações que o usuário participou;
- [x] Mecanismo para filtrar a tabela por data de transação e/ou transações do tipo cash-in/cash-out;
- [x] Botão para realizar o log-out;

## RFs (Requisitos funcionais) Backend

- [x] Deve ser possível se cadastrar um User (informe username, password para cadastrar);
- [x] (depois cadastro), automaticamente cria 1 account, na tabela account com R$100 de balance;
- [x] Deve ser possível logar um User (informe username, password para cadastrar);
- [x] (depois de logado) Deve ser possível ver balance do User
- [x] (depois de logado) Deve ser possível ver Tabela com os detalhes de todas as transações que o usuário participou
- [x] (depois de logado) Deve ser possível transferir para outros usuários NG a partir do username de quem sofrerá o cash-in
- [x] (depois de logado) Deve ser possível filtrar a tabela por data de transação e/ou transações do tipo cash-in/cash-out; (ja fiz o filtro adicionando na tabela transactions o campo type, o filtro será feito no front end)
- [x] (depois de logado) Deve ser possível realizar logOut (vou fazer no front retirando o cookie JWT)

## RFs (Requisitos funcionais) Frontend

- [ ] Deve ser possível se cadastrar um User (informe username, password para cadastrar);
- [ ] (depois cadastro), automaticamente cria 1 account, na tabela account com R$100 de balance;
- [x] Deve ser possível logar um User (informe username, password para cadastrar);
- [ ] (depois de logado) Deve ser possível ver balance do User
- [ ] (depois de logado) Deve ser possível ver Tabela com os detalhes de todas as transações que o usuário participou
- [ ] (depois de logado) Deve ser possível transferir para outros usuários NG a partir do username de quem sofrerá o cash-in
- [x] (depois de logado) Deve ser possível filtrar a tabela por data de transação e/ou transações do tipo cash-in/cash-out;
- [x] (depois de logado) Deve ser possível realizar logOut

## RNs (Regras de negócio) Backend

- [x] username tem que ser único;
- [x] username composto por, pelo menos, 3 caracteres;
- [x] password composta por pelo menos 8 caracteres, um número e uma letra maiúscula;
- [x] (depois cadastro), automaticamente cria 1 account, na tabela account com R$100 de balance;
- [x] (depois de logado) pode fazer cash-out informando o username do usuário que sofrerá o cash-in;
- [x] (depois de logado) deverá ser capaz de visualizar as transações financeiras (cash-out e cash-in) que participou;
- [x] Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela;
- [x] Todo usuário logado deverá ser capaz de filtrar as transações financeiras que participou por: (será feito no front end)
      Data de realização da transação
      e/ou
      Transações de _cash-out;_
      Transações de _cash-in._
- [x] Só pode cash-out se tiver balance suficiente para isso;
- [x] Usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo;
- [x] Toda nova transação bem-sucedida deverá ser registrada na tabela Transactions;
- [x] Em casos de falhas transacionais, a tabela Transactions não deverá ser afetada;

## RNs (Regras de negócio) Frontend

- [ ] username tem que ser único;
- [x] username composto por, pelo menos, 3 caracteres;
- [x] password composta por pelo menos 8 caracteres, um número e uma letra maiúscula;
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

## RNFs (Requisitos não-funcionais) Backend

- [x] A senha do usuário precisa estar criptografada ao armazenar no Banco de Dados;
- [x] O usuário deve ser identificado por um JWT depois de se logar (JSON Web Token) (com 24h de validade);

## RNFs (Requisitos não-funcionais) Frontend

- [x] A senha do usuário precisa estar criptografada ao armazenar no Banco de Dados;
- [x] O usuário deve ser identificado por um JWT depois de se logar (JSON Web Token) (com 24h de validade);
