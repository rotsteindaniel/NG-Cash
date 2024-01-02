import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      accountId: string
      // role: 'ADMIN' | 'MEMBER'
      sub: string
    }
  }
}
