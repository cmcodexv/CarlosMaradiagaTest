import { TypeRepository } from "./repositories/type.repository";
import { Type } from "./repositories/domain/type";
import { ApplicationException } from "../common/exceptions/application.exception";
import { TypeCreateDto, TypeUpdateDto } from "../dtos/type.dto";

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
    public async store(entry: TypeCreateDto): Promise<void> {
        const originalEntry = await this.typeRepository.findByName(entry.nombre);
        if (!originalEntry) {
            await this.typeRepository.store(entry as Type);
        } else {
            throw new ApplicationException('¡Tipo ya existe!');
        }
    }
    public async update(id: number, entry: TypeUpdateDto): Promise<void> {
        const originalEntry = await this.typeRepository.find(id);
        if (originalEntry) {
            //verificar nombre repetido
            const typeDb = await this.typeRepository.findByName(entry.nombre);
            if (!typeDb) {
                originalEntry.nombre = entry.nombre;
                await this.typeRepository.update(originalEntry);
            } else {
                throw new ApplicationException('¡Tipo ya existe!');
            }

        } else {
            throw new ApplicationException('¡Tipo no encontrado!');
        }

    }
    public async remove(id: number): Promise<void> {
        //verificar si tipo está vinculado a pokemon
        const verifyType = await this.typeRepository.findByPokemonType(id);
        if (!verifyType) {
            const originalEntry = await this.typeRepository.find(id);
            if (originalEntry) {
                await this.typeRepository.remove(id);
            } else {
                throw new ApplicationException('¡Tipo no encontrado!');
            }
        } else {
            throw new ApplicationException("¡Tipo no puede ser eliminado ya que el pokemon " + verifyType.nombre + " lo tiene asignado!");
        }

    }


}