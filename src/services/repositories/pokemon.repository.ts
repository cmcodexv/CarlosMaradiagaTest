import { Pokemon } from './domain/pokemon';

export interface PokemonRepository {
    all(): Promise<Pokemon[]>;
    // find(id: number): Promise<Movement | null>;
    // findUpdate(id: number): Promise<Movement | null>;
    // findByName(nombre: string): Promise<Movement | null>;
    // findByNameAndId(id:number, nombre: string): Promise<Movement | null>;
    // findByPokemonMovement(id:number): Promise<Movement | null>;
    // store(entry: Movement): Promise<void>;
    // update(entry: Movement): Promise<void>;
    // remove(id: number): Promise<void>;
}