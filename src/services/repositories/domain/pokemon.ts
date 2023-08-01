export interface Pokemon {
    pokemonId: number;
    nombre: string;
    tipos?: [];
    movimientos?: [];
    tipoId?: number | null;
    nivel: number;
    poder: number;
    saludActual: number;
    ataqueBase: number;
    defensaBase: number 
    ataqueEspecial: number;
    velocidad: number;
    activo?: number;
    fechaCreacion?: Date | null;
    fechaModificacion?: Date | null;
}