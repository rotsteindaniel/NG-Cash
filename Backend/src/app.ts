import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/env'

export const app = fastify()