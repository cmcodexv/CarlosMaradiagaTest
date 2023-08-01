import connector from '../../../../common/persistence/mysql.persistence';
import { PokemonRepository } from '../../pokemon.repository';
import { Pokemon } from '../../domain/pokemon';
import { MovementCreateDto } from "../../../../dtos/movement.dto";

export class PokemonMysqlRepository implements PokemonRepository {

    public async all(): Promise<Pokemon[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT p.pokemonId, p.nombre, GROUP_CONCAT(t.nombre) AS tipos, GROUP_CONCAT(m.nombre) AS movimientos, p.nivel, p.saludActual, p.ataqueBase, p.defensaBase, p.ataqueEspecial, p.defensaEspecial, p.velocidad, p.activo, p.fechaCreacion, p.fechaModificacion FROM pokemon p JOIN pokemonTipo pt ON p.pokemonId = pt.pokemonId JOIN tipo t ON pt.tipoId = t.tipoId JOIN pokemonMovimiento pm ON p.pokemonId = pm.pokemonId JOIN movimiento m ON pm.movimientoId = m.movimientoId WHERE p.activo = 1 AND pt.activo = 1 AND t.activo = 1 AND pm.activo = 1 AND m.activo = 1 GROUP BY p.pokemonId, p.nombre;'
        );

        return rows as Pokemon[];
    }

    // public async find(id: number): Promise<Movement | null> {
    //     const [rows]: any[] = await connector.execute(
    //         'SELECT m.movimientoId, m.nombre, t.nombre as tipo, m.categoria, m.poder, m.acc, m.pp, m.efecto, m.probabilidad, m.activo, m.fechaCreacion, m.fechaModificacion FROM movimiento as m LEFT JOIN tipo as t ON m.tipoId = t.tipoId WHERE m.movimientoId = ? AND m.activo = 1 AND t.activo = 1',
    //         [id]
    //     );

    //     if (rows.length) {
    //         return rows[0] as Movement;
    //     }

    //     return null;
    // }
    // public async findUpdate(id: number): Promise<Movement | null> {
    //     const [rows]: any[] = await connector.execute(
    //         'SELECT * FROM movimiento WHERE activo = 1 AND movimientoId = ?',
    //         [id]
    //     );

    //     if (rows.length) {
    //         return rows[0] as Movement;
    //     }

    //     return null;
    // }

    // public async findByName(nombre: string): Promise<Movement | null> {
    //     const [rows]: any[] = await connector.execute(
    //         'SELECT * FROM movimiento WHERE nombre = ? AND activo = 1',
    //         [nombre]
    //     );
    //     if (rows.length) {
    //         return rows[0] as Movement;
    //     }
    //     return null;
    // }

    // public async findByNameAndId(id: number, nombre: string): Promise<Movement | null> {
    //     const [rows]: any[] = await connector.execute(
    //         'SELECT * FROM movimiento WHERE nombre = ? AND activo = 1  AND movimientoId != ?',
    //         [nombre, id]
    //     );
    //     if (rows.length) {
    //         return rows[0] as Movement;
    //     }
    //     return null;
    // }

    // public async findByPokemonMovement(id: number): Promise<Movement | null> {
    //     const [rows]: any[] = await connector.execute(
    //         'SELECT pm.movimientoId, p.nombre FROM pokemonMovimiento as pm LEFT JOIN pokemon as p ON pm.pokemonId = p.pokemonId WHERE pm.movimientoId = ? AND pm.activo = 1 AND p.activo = 1',
    //         [id]
    //     );
    //     if (rows.length) {
    //         return rows[0] as Movement;
    //     }
    //     return null;
    // }

    // public async store(entry: MovementCreateDto): Promise<void> {
    //     const now = new Date();
    //     await connector.execute(
    //         'INSERT INTO movimiento(nombre, tipoId, categoria, poder, acc, pp, efecto, probabilidad , activo, fechaCreacion) VALUES (?,?,?,?,?,?,?,?,?,?)',
    //         [entry.nombre, entry.tipoId, entry.categoria, entry.poder, entry.acc, entry.pp, entry.efecto, entry.probabilidad, 1, now]
    //     );
    // }

    // public async update(entry: Movement): Promise<void> {
    //     const now = new Date();
    //     await connector.execute(
    //         'UPDATE movimiento SET nombre = ?, tipoId = ?, categoria = ?, poder = ?, acc = ?, pp = ?, efecto = ?, probabilidad = ?, fechaModificacion = ? WHERE movimientoId = ?',
    //         [entry.nombre, entry.tipoId, entry.categoria, entry.poder, entry.acc, entry.pp, entry.efecto, entry.probabilidad, now, entry.movimientoId]
    //     );
    // }
    // public async remove(id: number): Promise<void> {
    //     const now = new Date();
    //     await connector.execute(
    //         'UPDATE movimiento SET activo = ?, fechaModificacion = ? WHERE movimientoId = ?',
    //         [0, now, id]
    //     );
    // }

}