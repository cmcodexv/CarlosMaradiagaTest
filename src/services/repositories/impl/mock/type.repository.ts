import db from "../../../../common/persistence/mock.persistence";
import { TypeRepository } from "../../type.repository";
import { Type } from "../../domain/type";

export class TypeMockRepository implements TypeRepository {
    
    
    public async store(entry: Type): Promise<void> {
        const table = db.tipos as Type[];
        const now = new Date();
        
        db._tipoId++;
        
        table.push({
            tipoId: db._tipoId,
            nombre: entry.nombre,
            activo: 1,
            fechaCreacion: now,
            fechaModificacion: null,
        } as Type);
    }
    public async all(): Promise<Type[]> {
        const table = db.tipos as Type[];
        return Object.assign([...table]);
    }
    public async find(id: number): Promise<Type | null> {
        const table = db.tipos as Type[];
        const result = table.find(x => x.tipoId === id);

        if (result) {
            return Object.assign({ ...result });
        }

        return null;
    }
    public async findByName(nombre: string): Promise<Type | null> {
        const table = db.tipos as Type[];
        const result = table.find(x => x.nombre === nombre);

        if (result) {
            return Object.assign({ ...result });
        }

        return null;
    }

    public async findByPokemonType(id: number): Promise<Type | null> {
        const table = db.tipos as Type[];
        const result = table.find(x => x.tipoId === id);

        if (result) {
            return Object.assign({ ...result });
        }

        return null;
    }
    public async update(entry: Type): Promise<void> {
        const table = db.tipos as Type[];
        const now = new Date();

        const originalEntry = table.find(x => x.tipoId === entry.tipoId);

        if (originalEntry) {
            originalEntry.nombre = entry.nombre;
        }
    }

    public async remove(id: number): Promise<void> {
        const table = db.tipos as Type[];
        db.tipos = table.filter(x => x.tipoId === id) as any;
    }
}