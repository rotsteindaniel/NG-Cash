import fastify from 'fastify';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const app = fastify();

// app.register(categoriesRoutes, { prefix: '/categories' });
// app.register(specificationsRoutes, { prefix: '/specifications' });
app.register(usersRoutes, { prefix: '/users' });
// app.register(carsRoutes, { prefix: '/cars' });
// app.register(rentalRoutes, { prefix: '/rentals' });
// app.register(passwordRoutes, { prefix: '/password' });
// app.register(authenticateRoutes); // No prefix for this route

export { app };
