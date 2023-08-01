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

interface MovementUpdateDto {
    nombre: string;
    tipoId: number;
    categoria: string | null;
    poder: number | null;
    acc: number | null;
    pp: number | null;
    efecto: string | null;
    probabilidad: number | null;
}



export {
    PokemonCreateDto
};