import { MovementRepository } from "./repositories/movement.repository";
import { Movement } from "./repositories/domain/movement";
import { ApplicationException } from "../common/exceptions/application.exception";
import { MovementCreateDto, MovementUpdateDto } from "../dtos/movement.dto";

export class MovementService {
    constructor(
        private readonly movementRepository: MovementRepository
    ) { }

    public async all(): Promise<Movement[]> {
        return await this.movementRepository.all();
    }
    public async find(id: number): Promise<Movement | null> {
        return this.movementRepository.find(id);
    }
    public async store(entry: MovementCreateDto): Promise<void> {
        const originalEntry = await this.movementRepository.findByName(entry.nombre);
        if (!originalEntry) {
            await this.movementRepository.store(entry as Movement);
        } else {
            throw new ApplicationException('¡Movimiento ya existe!');
        }
    }
    public async update(id: number, entry: MovementUpdateDto): Promise<void> {
        const originalEntry = await this.movementRepository.findUpdate(id);
        if (originalEntry) {
            //verificar nombre repetido
            const movementDb = await this.movementRepository.findByNameAndId(id, entry.nombre);
            if (!movementDb) {
                originalEntry.nombre = entry.nombre;
                originalEntry.tipoId = entry.tipoId,
                originalEntry.categoria = entry.categoria;
                originalEntry.poder = entry.poder;
                originalEntry.acc = entry.acc;
                originalEntry.pp = entry.pp;
                originalEntry.efecto = entry.efecto;
                originalEntry.probabilidad = entry.probabilidad;
                await this.movementRepository.update(originalEntry);
            } else {
                throw new ApplicationException('¡Movimiento ya existe!');
            }

        } else {
            throw new ApplicationException('¡Movimiento no encontrado!');
        }

    }
    public async remove(id: number): Promise<void> {
        const originalEntry = await this.movementRepository.find(id);

        if (originalEntry) {
            await this.movementRepository.remove(id);
        } else {
            throw new ApplicationException('¡Tipo no encontrado!');
        }
    }


}