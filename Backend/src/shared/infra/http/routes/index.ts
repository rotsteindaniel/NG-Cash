import fastify from 'fastify';

import { usersRoutes } from './users.routes';

const app = fastify();

app.register(usersRoutes, { prefix: '/users' });


export { app };
