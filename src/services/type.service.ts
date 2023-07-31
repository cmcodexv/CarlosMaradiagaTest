import { TypeRepository } from "./repositories/type.repository";
import { Type } from "./repositories/domain/type";

export class TypeService {
    constructor(
        private readonly typeRepository: TypeRepository
    ) { }

    public async all(): Promise<Type[]> {
        return await this.typeRepository.all();
    }
    public async find(id: number): Promise<Type | null> {
        return await this.typeRepository.find(id);
    }


}