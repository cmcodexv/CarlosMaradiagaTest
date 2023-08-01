import express = require('express');
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { TypeMysqlRepository } from './services/repositories/impl/mysql/type.repository';
import { TypeService } from './services/type.service';
import { MovementMysqlRepository } from './services/repositories/impl/mysql/movement.repository';
import { MovementService } from './services/movement.service';

export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        // repositories
        typeRepository: asClass(TypeMysqlRepository).scoped(),
        movementRepository: asClass(MovementMysqlRepository).scoped(),
        // services
        typeService: asClass(TypeService).scoped(),
        movementService: asClass(MovementService).scoped()

    });
    app.use(scopePerRequest(container));
}