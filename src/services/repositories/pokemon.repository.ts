import { Pokemon } from './domain/pokemon';
import { PokemonTypeMovement } from "../../dtos/pokemon.dto";
export interface PokemonRepository {
    all(): Promise<Pokemon[]>;
    allBase(): Promise<Pokemon[]>;
    find(id: number): Promise<Pokemon | null>;
    typeMovementById(id: number): Promise<PokemonTypeMovement | null>;
    findUpdate(id: number): Promise<Pokemon | null>;
    findByName(nombre: string): Promise<Pokemon | null>;
    findByNameAndId(id:number, nombre: string): Promise<Pokemon | null>;
    store(entry: Pokemon): Promise<void>;
    update(entry: Pokemon): Promise<void>;
    remove(id: number): Promise<void>;
}