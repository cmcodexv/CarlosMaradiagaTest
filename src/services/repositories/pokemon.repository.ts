import { Pokemon } from './domain/pokemon';

export interface PokemonRepository {
    all(): Promise<Pokemon[]>;
    allBase(): Promise<Pokemon[]>;
    find(id: number): Promise<Pokemon | null>;
    // findUpdate(id: number): Promise<Movement | null>;
    findByName(nombre: string): Promise<Pokemon | null>;
    // findByNameAndId(id:number, nombre: string): Promise<Movement | null>;
    // findByPokemonMovement(id:number): Promise<Movement | null>;
    store(entry: Pokemon): Promise<void>;
    // update(entry: Movement): Promise<void>;
    // remove(id: number): Promise<void>;
}