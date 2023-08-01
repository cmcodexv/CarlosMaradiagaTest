interface MovementCreateDto{
    movimientoId: number;
    nombre: string;
    tipoId: number;
    categoria: string | null;
    poder: number | null;
    acc: number | null;
    pp: number | null;
    efecto: string | null;
    probabilidad: number | null;
}

interface MovementUpdateDto{
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
    MovementCreateDto,
    MovementUpdateDto
};