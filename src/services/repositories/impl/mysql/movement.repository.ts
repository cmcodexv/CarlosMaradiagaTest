import connector from '../../../../common/persistence/mysql.persistence';
import { MovementRepository } from '../../movement.repository';
import { Movement } from '../../domain/movement';
import { MovementCreateDto } from "../../../../dtos/movement.dto";

export class MovementMysqlRepository implements MovementRepository {

    public async all(): Promise<Movement[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT m.movimientoId, m.nombre, t.nombre as tipo, m.categoria, m.poder, m.acc, m.pp, m.efecto, m.probabilidad, m.activo, m.fechaCreacion, m.fechaModificacion FROM movimiento as m LEFT JOIN tipo as t ON m.tipoId = t.tipoId WHERE m.activo = 1 AND t.activo = 1 ORDER BY movimientoId ASC'
        );

        return rows as Movement[];
    }

    public async find(id: number): Promise<Movement | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT m.movimientoId, m.nombre, t.nombre as tipo, m.categoria, m.poder, m.acc, m.pp, m.efecto, m.probabilidad, m.activo, m.fechaCreacion, m.fechaModificacion FROM movimiento as m LEFT JOIN tipo as t ON m.tipoId = t.tipoId WHERE m.movimientoId = ? AND m.activo = 1 AND t.activo = 1',
            [id]
        );

        if (rows.length) {
            return rows[0] as Movement;
        }

        return null;
    }
    public async findUpdate(id: number): Promise<Movement | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM movimiento WHERE activo = 1 AND movimientoId = ?',
            [id]
        );

        if (rows.length) {
            return rows[0] as Movement;
        }

        return null;
    }

    public async findByName(nombre: string): Promise<Movement | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM movimiento WHERE nombre = ? AND activo = 1',
            [nombre]
        );
        if (rows.length) {
            return rows[0] as Movement;
        }
        return null;
    }

    public async findByNameAndId(id: number, nombre: string): Promise<Movement | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM movimiento WHERE nombre = ? AND activo = 1  AND movimientoId != ?',
            [nombre, id]
        );
        if (rows.length) {
            return rows[0] as Movement;
        }
        return null;
    }

    public async findByPokemonMovement(id: number): Promise<Movement | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT pm.movimientoId, p.nombre FROM pokemonMovimiento as pm LEFT JOIN pokemon as p ON pm.pokemonId = p.pokemonId WHERE pm.movimientoId = ? AND pm.activo = 1 AND p.activo = 1',
            [id]
        );
        if (rows.length) {
            return rows[0] as Movement;
        }
        return null;
    }

    public async store(entry: MovementCreateDto): Promise<void> {
        const now = new Date();
        await connector.execute(
            'INSERT INTO movimiento(nombre, tipoId, categoria, poder, acc, pp, efecto, probabilidad , activo, fechaCreacion) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [entry.nombre, entry.tipoId, entry.categoria, entry.poder, entry.acc, entry.pp, entry.efecto, entry.probabilidad, 1, now]
        );
    }

    public async update(entry: Movement): Promise<void> {
        const now = new Date();
        await connector.execute(
            'UPDATE movimiento SET nombre = ?, tipoId = ?, categoria = ?, poder = ?, acc = ?, pp = ?, efecto = ?, probabilidad = ?, fechaModificacion = ? WHERE movimientoId = ?',
            [entry.nombre, entry.tipoId, entry.categoria, entry.poder, entry.acc, entry.pp, entry.efecto, entry.probabilidad, now, entry.movimientoId]
        );
    }
    public async remove(id: number): Promise<void> {
        const now = new Date();
        await connector.execute(
            'UPDATE movimiento SET activo = ?, fechaModificacion = ? WHERE movimientoId = ?',
            [0, now, id]
        );
    }

}