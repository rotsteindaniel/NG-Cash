# NG.CASH - Aplicação Full Stack

## Descrição

Esta aplicação, denominada NG.CASH, é uma plataforma de gerenciamento financeiro que permite aos usuários realizar operações como cadastro, login, visualização de saldo, transferências e consulta de transações.

Desenvolvida como parte de um teste para a vaga de Junior Full Stack (que recebi quando ainda estava iniciando e não sabia como fazer), a aplicação é composta por um backend construído em Node.js com Typescript, utilizando o Prisma ORM e persistindo dados em um banco PostgreSQL (Utilizando Docker).

O frontend é implementado Next.js, Typescript, e utiliza CSS3 com uma biblioteca de estilização (Ant Design).

## Backend

- [x] Precisa usar Docker;
- [x] Um servidor em Node.js utilizando Typescript;
- [x] Prisma ORM (poderia escolher qualquer um);
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;

## Frontend

- [x] React ou Next utilizando Typescript;
- [x] CSS3 ou uma biblioteca de estilização de sua preferência (estou usando Ant Desing para testar);
- [x] Página para realizar o cadastro na NG informando username e password;
- [x] Página para realizar o login informando username e password;

### Página principal deve apresentar:

- [x] Balance atual do usuário;
- [x] Seção voltada à realização de transferências para outros usuários NG a partir do username de quem sofrerá o cash-in;
- [x] Tabela com os detalhes de todas as transações que o usuário participou;
- [x] Mecanismo para filtrar a tabela por tipo de transação cash-in/cash-out;
- [x] Botão para realizar o log-out;

## RFs (Requisitos funcionais) Backend

- [x] Deve ser possível se cadastrar um User (informe username, password para cadastrar);
- [x] (depois cadastro), automaticamente cria 1 account, na tabela account com R$100 de balance;
- [x] Deve ser possível logar um User (informe username, password para cadastrar);
- [x] (depois de logado) Deve ser possível ver balance do User
- [x] (depois de logado) Deve ser possível ver Tabela com os detalhes de todas as transações que o usuário participou
- [x] (depois de logado) Deve ser possível transferir para outros usuários NG a partir do username de quem sofrerá o cash-in
- [x] (depois de logado) Deve ser possível filtrar a tabela por tipo de transação cash-in/cash-out; (fiz o filtro adicionando na tabela transactions, o filtro será feito no front end)
- [x] (depois de logado) Deve ser possível realizar logOut (vou fazer no front retirando o cookie JWT)

## RFs (Requisitos funcionais) Frontend

- [x] Deve ser possível se cadastrar um User (informe username, password para cadastrar);
- [x] (depois cadastro), automaticamente cria 1 account, na tabela account com R$100 de balance;
- [x] Deve ser possível logar um User (informe username, password para cadastrar);
- [x] (depois de logado) Deve ser possível ver balance do User
- [x] (depois de logado) Deve ser possível ver Tabela com os detalhes de todas as transações que o usuário participou
- [x] (depois de logado) Deve ser possível transferir para outros usuários NG a partir do username de quem sofrerá o cash-in
- [x] (depois de logado) Deve ser possível filtrar a tabela por tipo de transação cash-in/cash-out;
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
      Transações de cash-out;
      Transações de cash-in;
- [x] Só pode cash-out se tiver balance suficiente para isso;
- [x] Usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo;
- [x] Toda nova transação bem-sucedida deverá ser registrada na tabela Transactions;
- [x] Em casos de falhas transacionais, a tabela Transactions não deverá ser afetada;

## RNs (Regras de negócio) Frontend

- [x] username tem que ser único;
- [x] username composto por, pelo menos, 3 caracteres;
- [x] password composta por pelo menos 8 caracteres, um número e uma letra maiúscula;
- [x] (depois cadastro), automaticamente cria 1 account, na tabela account com R$100 de balance;
- [x] (depois de logado) pode fazer cash-out informando o username do usuário que sofrerá o cash-in;
- [x] (depois de logado) deverá ser capaz de visualizar as transações financeiras (cash-out e cash-in) que participou;
- [x] Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela;
- [x] Todo usuário logado deverá ser capaz de filtrar as transações financeiras que participou por:
      Transações de cash-out;
      Transações de cash-in;
- [x] Só pode cash-out se tiver balance suficiente para isso;
- [x] Usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo;
- [x] Toda nova transação bem-sucedida deverá ser registrada na tabela Transactions;
- [x] Em casos de falhas transacionais, a tabela Transactions não deverá ser afetada;

## RNFs (Requisitos não-funcionais) Backend

- [x] A senha do usuário precisa estar criptografada ao armazenar no Banco de Dados;
- [x] O usuário deve ser identificado por um JWT depois de se logar (JSON Web Token) (com 24h de validade);

## RNFs (Requisitos não-funcionais) Frontend

- [x] A senha do usuário precisa estar criptografada ao armazenar no Banco de Dados;
- [x] O usuário deve ser identificado por um JWT depois de se logar (JSON Web Token) (com 24h de validade);

## Tecnologias Utilizadas

### Backend:

- Node.js
- Typescript
- Prisma ORM
- PostgreSQL
- Docker

### Frontend:

- Next.js
- Typescript
- CSS3, Ant Design

### Como rodar o projeto:

1. Clonar o repositorio ou baixar e descompactar
2. Criar um arquivo ".env" na pasta "Backend" seguindo os moldes do ".env.example"
3. Dentro da pasta "Backend" rodar o comando "docker compose up -d" para ler o arquivo "docker-compose.yml"
4. Instalar as dependencias:
5. Entrar na pasta "Backend" e rodar "npm install"
6. Dentro da pasta "Backend" rodar "npm run dev"
7. Dentro da pasta "Frontend" rodar "npm install"
8. Dentro da pasta "Frontend" rodar "npm run dev"
9. A aplicação estará rodando em http://localhost:3000

Este projeto foi desenvolvido como resposta ao teste para a vaga de Junior Full Stack que recebi a muito tempo atrás, demonstrando habilidades tanto no desenvolvimento do backend quanto do frontend, além de boas práticas de segurança e organização de código.

Se tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato!
