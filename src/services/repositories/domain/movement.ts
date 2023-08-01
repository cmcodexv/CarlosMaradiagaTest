export interface Movement {
    movimientoId: number;
    nombre: string;
    tipo?: string;
    tipoId?: number;
    categoria: string | null;
    poder: number | null;
    acc: number | null;
    pp: number | null;
    efecto: string | null;
    probabilidad: number | null;
    activo?: number;
    fechaCreacion?: Date | null;
    fechaModificacion?: Date | null;
}