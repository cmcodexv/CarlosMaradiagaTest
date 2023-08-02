import { PokemonRepository } from "./repositories/pokemon.repository";
import { Pokemon } from "./repositories/domain/pokemon";
import { ApplicationException } from "../common/exceptions/application.exception";
import { PokemonCreateDto, PokemonUpdateDto } from "../dtos/pokemon.dto";

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
    public async update(id: number, entry: PokemonUpdateDto): Promise<void> {
        const originalEntry = await this.pokemonRepository.findUpdate(id);
        if (originalEntry) {
            //verificar nombre repetido
            const movementDb = await this.pokemonRepository.findByNameAndId(id, entry.nombre);
            if (!movementDb) {
                originalEntry.nombre = entry.nombre,
                originalEntry.nivel = entry.nivel,
                originalEntry.saludTotal = entry.saludTotal,
                originalEntry.saludActual = entry.saludActual,
                originalEntry.ataqueBase = entry.ataqueBase,
                originalEntry.defensaBase = entry.defensaBase,
                originalEntry.defensaEspecial = entry.defensaEspecial,
                originalEntry.ataqueEspecial = entry.ataqueEspecial,
                originalEntry.velocidad = entry.velocidad
                await this.pokemonRepository.update(originalEntry);
            } else {
                throw new ApplicationException('¡Pokemon base ya existe!');
            }

        } else {
            throw new ApplicationException('¡Pokemon base no encontrado!');
        }

    }
    public async remove(id: number): Promise<void> {

            const originalEntry = await this.pokemonRepository.findUpdate(id);
            if (originalEntry) {
                await this.pokemonRepository.remove(id);
            } else {
                throw new ApplicationException('¡Pokemon no encontrado!');
            }
        
    }


}