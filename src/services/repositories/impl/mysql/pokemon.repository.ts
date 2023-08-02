import connector from '../../../../common/persistence/mysql.persistence';
import { PokemonRepository } from '../../pokemon.repository';
import { Pokemon } from '../../domain/pokemon';
import { PokemonCreateDto } from "../../../../dtos/pokemon.dto";

export class PokemonMysqlRepository implements PokemonRepository {

    public async all(): Promise<Pokemon[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT p.pokemonId, p.nombre, GROUP_CONCAT(t.nombre) AS tipos, GROUP_CONCAT(m.nombre) AS movimientos, p.nivel, p.saludActual, p.ataqueBase, p.defensaBase, p.ataqueEspecial, p.defensaEspecial, p.velocidad, p.activo, p.fechaCreacion, p.fechaModificacion FROM pokemon p JOIN pokemonTipo pt ON p.pokemonId = pt.pokemonId JOIN tipo t ON pt.tipoId = t.tipoId JOIN pokemonMovimiento pm ON p.pokemonId = pm.pokemonId JOIN movimiento m ON pm.movimientoId = m.movimientoId WHERE p.activo = 1 AND pt.activo = 1 AND t.activo = 1 AND pm.activo = 1 AND m.activo = 1 GROUP BY p.pokemonId, p.nombre;'
        );

        return rows as Pokemon[];
    }
    public async allBase(): Promise<Pokemon[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM pokemon WHERE activo = 1 AND base = 1;'
        );

        return rows as Pokemon[];
    }
    public async find(id: number): Promise<Pokemon | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM pokemon WHERE activo = 1 AND base = 1 AND pokemonId = ?',
            [id]
        );

        if (rows.length) {
            return rows[0] as Pokemon;
        }

        return null;
    }
    public async findUpdate(id: number): Promise<Pokemon | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM pokemon WHERE activo = 1 AND pokemonId = ? AND base = 1',
            [id]
        );

        if (rows.length) {
            return rows[0] as Pokemon;
        }

        return null;
    }

    public async findByName(nombre: string): Promise<Pokemon | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM pokemon WHERE nombre = ? AND activo = 1',
            [nombre]
        );
        if (rows.length) {
            return rows[0] as Pokemon;
        }
        return null;
    }

    public async findByNameAndId(id: number, nombre: string): Promise<Pokemon | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT nombre FROM pokemon WHERE nombre = ? AND activo = 1 AND base = 1 AND pokemonId != ?',
            [nombre, id]
        );
        if (rows.length) {
            return rows[0] as Pokemon;
        }
        return null;
    }

    public async store(entry: PokemonCreateDto): Promise<void> {
        const now = new Date();
        await connector.execute(
            'INSERT INTO pokemon(nombre, nivel, saludTotal, saludActual, ataqueBase, defensaBase, ataqueEspecial, defensaEspecial, velocidad, base, activo, fechaCreacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            [entry.nombre, entry.nivel, entry.saludTotal, entry.saludActual, entry.ataqueBase, entry.defensaBase, entry.ataqueEspecial, entry.defensaEspecial, entry.velocidad, 1, 1, now]
        );
    }

    public async update(entry: Pokemon): Promise<void> {
        const now = new Date();
        await connector.execute(
            'UPDATE pokemon SET nombre = ?, saludActual = ?, nivel = ?, saludTotal = ?, ataqueBase = ?, defensaBase = ?, defensaEspecial = ?, ataqueEspecial = ?, velocidad = ?, fechaModificacion = ? WHERE pokemonId = ?',
            [entry.nombre, entry.saludActual, entry.nivel, entry.saludTotal, entry.ataqueBase, entry.defensaBase, entry.defensaEspecial, entry.ataqueEspecial, entry.velocidad, now, entry.pokemonId]
        );
    }

    public async remove(id: number): Promise<void> {
        const now = new Date();
        await connector.execute(
            'UPDATE pokemon SET activo = ?, fechaModificacion = ? WHERE pokemonId = ?',
            [0, now, id]
        );
    }

}