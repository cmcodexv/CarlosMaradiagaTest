import { Type } from './domain/type';

export interface TypeRepository {
    all(): Promise<Type[]>;
    find(id: number): Promise<Type | null>;
}