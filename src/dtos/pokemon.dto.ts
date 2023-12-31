interface PokemonCreateDto {
    pokemonId: number;
    nombre: string;
    nivel: number;
    poder: number;
    saludTotal: number;
    saludActual: number;
    ataqueBase: number;
    defensaBase: number;
    defensaEspecial: number;
    ataqueEspecial: number;
    velocidad: number;
    base?: number;
    activo?: number;
    fechaCreacion?: Date | null;

}

interface PokemonUpdateDto {
    nombre: string;
    nivel: number;
    poder: number;
    saludTotal: number;
    saludActual: number;
    ataqueBase: number;
    defensaBase: number;
    defensaEspecial: number;
    ataqueEspecial: number;
    velocidad: number;
}
interface PokemonTypeMovement {
    pokemonId: number;
    nombre: string;
    tipos?: [];
    movimientos?: [];
}


export {
    PokemonCreateDto,
    PokemonUpdateDto,
    PokemonTypeMovement
};