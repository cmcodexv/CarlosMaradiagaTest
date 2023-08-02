export interface Pokemon {
    pokemonId: number;
    nombre: string;
    tipos?: [];
    movimientos?: [];
    nivel: number;
    saludTotal: number;
    saludActual: number;
    ataqueBase: number;
    defensaBase: number;
    defensaEspecial: number;
    ataqueEspecial: number;
    velocidad: number;
    activo?: number;
    fechaCreacion?: Date | null;
    fechaModificacion?: Date | null;
}