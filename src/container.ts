import express = require('express');
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { TypeMysqlRepository } from './services/repositories/impl/mysql/type.repository';
import { TypeService } from './services/type.service';
import { MovementMysqlRepository } from './services/repositories/impl/mysql/movement.repository';
import { MovementService } from './services/movement.service';
import { PokemonMysqlRepository } from './services/repositories/impl/mysql/pokemon.repository';
import { PokemonService } from './services/pokemon.service';

export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        // repositories
        typeRepository: asClass(TypeMysqlRepository).scoped(),
        movementRepository: asClass(MovementMysqlRepository).scoped(),
        pokemonRepository: asClass(PokemonMysqlRepository).scoped(),
        // services
        typeService: asClass(TypeService).scoped(),
        movementService: asClass(MovementService).scoped(),
        pokemonService: asClass(PokemonService).scoped()

    });
    app.use(scopePerRequest(container));
}