import { PokemonRepository } from "./repositories/pokemon.repository";
import { Pokemon } from "./repositories/domain/pokemon";
import { ApplicationException } from "../common/exceptions/application.exception";
import { PokemonCreateDto } from "../dtos/pokemon.dto";

export class PokemonService {
    constructor(
        private readonly pokemonRepository: PokemonRepository
    ) { }

    public async all(): Promise<Pokemon[]> {
        return await this.pokemonRepository.all();
    }
    public async allBase(): Promise<Pokemon[]> {
        return await this.pokemonRepository.allBase();
    }
    public async find(id: number): Promise<Pokemon | null> {
        return this.pokemonRepository.find(id);
    }
    public async store(entry: PokemonCreateDto): Promise<void> {
        const originalEntry = await this.pokemonRepository.findByName(entry.nombre);
        if (!originalEntry) {
            await this.pokemonRepository.store(entry as Pokemon);
        } else {
            throw new ApplicationException('¡Pokemon ya existe!');
        }
    }
    // public async update(id: number, entry: MovementUpdateDto): Promise<void> {
    //     const originalEntry = await this.movementRepository.findUpdate(id);
    //     if (originalEntry) {
    //         //verificar nombre repetido
    //         const movementDb = await this.movementRepository.findByNameAndId(id, entry.nombre);
    //         if (!movementDb) {
    //             originalEntry.nombre = entry.nombre;
    //             originalEntry.tipoId = entry.tipoId,
    //                 originalEntry.categoria = entry.categoria;
    //             originalEntry.poder = entry.poder;
    //             originalEntry.acc = entry.acc;
    //             originalEntry.pp = entry.pp;
    //             originalEntry.efecto = entry.efecto;
    //             originalEntry.probabilidad = entry.probabilidad;
    //             await this.movementRepository.update(originalEntry);
    //         } else {
    //             throw new ApplicationException('¡Movimiento ya existe!');
    //         }

    //     } else {
    //         throw new ApplicationException('¡Movimiento no encontrado!');
    //     }

    // }
    // public async remove(id: number): Promise<void> {
    //     //verificar si movimiento está vinculado a pokemon
    //     const verifyMovement = await this.movementRepository.findByPokemonMovement(id);
    //     if (!verifyMovement) {
    //         const originalEntry = await this.movementRepository.find(id);
    //         if (originalEntry) {
    //             await this.movementRepository.remove(id);
    //         } else {
    //             throw new ApplicationException('¡Movimiento no encontrado!');
    //         }
    //     } else {
    //         throw new ApplicationException("¡Movimiento no puede ser eliminado ya que el pokemon " + verifyMovement.nombre + " lo tiene asignado!");
    //     }

    // }


}