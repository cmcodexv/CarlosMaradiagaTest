import { TypeService } from './type.service';
import { TypeMockRepository } from './repositories/impl/mock/type.repository';
import { TypeCreateDto } from '../dtos/type.dto';
import assert = require('assert');

const typeService = new TypeService(
    new TypeMockRepository()
);

describe('Type.Service', () => {
    describe('Store', () => {
        it('tries to register a new type', async () => {
            await typeService.store({
                nombre: "Tipo test"
            } as TypeCreateDto);
        });
        it('tries to register a type repeated', async () => {
            try {
                await typeService.store({
                    nombre: "Tipo test"
                } as TypeCreateDto);
            } catch (error: any) {
                assert.equal(error.message, '¡Tipo ya existe!');
            }
        });
    });
});