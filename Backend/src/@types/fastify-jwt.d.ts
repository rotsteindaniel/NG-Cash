import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      accountId: string
      // transactions: transactions[]
      // role: 'ADMIN' | 'MEMBER'
      sub: string
    }
  }
}
