// Env variables
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.APP_ENV = process.env.APP_ENV || 'dev';

// Env files
import dotenv from 'dotenv';
// swagger
import swaggerUi, { JsonObject } from 'swagger-ui-express';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`,
});


import express from 'express';
import loadContainer from './container';
import { loadControllers } from 'awilix-express';
import { jsonSwagger } from './docs/basicInfo';

const app: express.Application = express();

//container
loadContainer(app);

//JSON SUPPORT
app.use(express.json());

//controllers
app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(jsonSwagger));
export { app };


