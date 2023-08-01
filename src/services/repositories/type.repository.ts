import { Type } from './domain/type';

export interface TypeRepository {
    all(): Promise<Type[]>;
    find(id: number): Promise<Type | null>;
    findByName(nombre: string): Promise<Type | null>;
    findByPokemonType(id:number): Promise<Type | null>;
    store(entry: Type): Promise<void>;
    update(entry: Type): Promise<void>;
    remove(id: number): Promise<void>;
}