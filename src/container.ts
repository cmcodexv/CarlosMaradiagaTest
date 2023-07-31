import express = require('express');
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { TypeMysqlRepository } from './services/repositories/impl/mysql/type.repository';
import { TypeService } from './services/type.service';

export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        // repositories
        typeRepository: asClass(TypeMysqlRepository).scoped(),
        // services
        typeService: asClass(TypeService).scoped()

    });
    app.use(scopePerRequest(container));
}