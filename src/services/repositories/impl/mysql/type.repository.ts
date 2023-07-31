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
}