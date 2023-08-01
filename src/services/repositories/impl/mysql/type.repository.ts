import connector from '../../../../common/persistence/mysql.persistence';
import { TypeRepository } from '../../type.repository';
import { Type } from '../../domain/type';

export class TypeMysqlRepository implements TypeRepository {

    public async all(): Promise<Type[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM tipo WHERE activo = 1 ORDER BY tipoId ASC'
        );

        return rows as Type[];
    }

    public async find(id: number): Promise<Type | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM tipo WHERE tipoId = ? AND activo = 1',
            [id]
        );

        if (rows.length) {
            return rows[0] as Type;
        }

        return null;
    }

    public async findByName(nombre: string): Promise<Type | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM tipo WHERE nombre = ? AND activo = 1',
            [nombre]
        );
        if (rows.length) {
            return rows[0] as Type;
        }
        return null;
    }

    public async findByPokemonType(id: number): Promise<Type | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT pt.tipoId, p.nombre FROM pokemonTipo as pt LEFT JOIN pokemon as p ON pt.pokemonId = p.pokemonId WHERE pt.tipoId = ? AND pt.activo = 1 AND p.activo = 1',
            [id]
        );
        if (rows.length) {
            return rows[0] as Type;
        }
        return null;
    }

    public async store(entry: Type): Promise<void> {
        const now = new Date();
        await connector.execute(
            'INSERT INTO tipo(nombre, activo, fechaCreacion) VALUES (?,?,?)',
            [entry.nombre, 1, now]
        );
    }

    public async update(entry: Type): Promise<void> {
        const now = new Date();
        await connector.execute(
            'UPDATE tipo SET nombre = ?, fechaModificacion = ? WHERE tipoId = ?',
            [entry.nombre, now, entry.tipoId]
        );
    }
    public async remove(id: number): Promise<void> {
        const now = new Date();
        await connector.execute(
            'UPDATE tipo SET activo = ?, fechaModificacion = ? WHERE tipoId = ?',
            [0, now, id]
        );
    }

}