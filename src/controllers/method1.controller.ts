import { Request, Response } from "express";
import connector from '../common/persistence/mysql.persistence';
import { route, POST } from "awilix-express";
import { BaseController } from "../common/controllers/base.controller";

@route('/method1')
export class Method1Controller extends BaseController {
    constructor(
    ) {
        super();
    }

    //post
    @POST()
    public async store(req: Request, res: Response) {
        try {
            //params
            const pokemonId = req.body.pokemonId;
            const pokemonRivalId = req.body.pokemonRivalId;
            const movimientoId = req.body.movimientoId;

            //atacante
            const [pokemonInfo]: any[] = await connector.execute(
                'SELECT t.tipoId as tipo, p.nombre,p.ataqueBase, p.defensaBase,p.nivel FROM pokemonTipo as pt INNER JOIN tipo as t ON pt.tipoId = t.tipoId INNER JOIN pokemon as p ON p.pokemonId = pt.pokemonId WHERE p.pokemonId = ? AND p.activo = 1 limit 1',
                [pokemonId]
            );
            if (pokemonInfo.length) {
                //rival
                const [pokemonRivalInfo]: any[] = await connector.execute(
                    'SELECT t.tipoId as tipo , p.nombre, p.ataqueBase, p.defensaBase FROM pokemonTipo as pt INNER JOIN tipo as t ON pt.tipoId = t.tipoId INNER JOIN pokemon as p ON p.pokemonId = pt.pokemonId WHERE p.pokemonId = ? AND p.activo = 1 limit 1',
                    [pokemonRivalId]
                );
                if (pokemonRivalInfo.length) {
                    //mov
                    const [movimientoInfo]: any[] = await connector.execute(
                        'SELECT poder, nombre FROM movimiento WHERE movimientoId = ? AND activo = 1',
                        [movimientoId]
                    );
                    if (movimientoInfo.length) {
                        //efectividad
                        const [efectividad]: any[] = await connector.execute(
                            'SELECT resultado FROM efectividad WHERE tipoAtaque = ? AND tipoDefensa = ? AND activo = 1',
                            [pokemonInfo[0].tipo, pokemonRivalInfo[0].tipo]
                        );
                        if (efectividad.length) {
                            //helper
                            const rango = ((100 - 85) / 2) - 1;
                            let random: number;
                            random = 2 * Math.floor(Math.random() * rango) + 1 + 85;
                            
                            //formula
                            let danio: any;
                            danio = (((2 * pokemonInfo[0].nivel / 5 + 2) * pokemonInfo[0].ataqueBase * movimientoInfo[0].poder / pokemonRivalInfo[0].defensaBase)/50) * efectividad[0].resultado * random / 100;
                            res.send({status: 200, res: "El pokemón " + pokemonInfo[0].nombre+" atacó a "+ pokemonRivalInfo[0].nombre+" con el movimiento "+ movimientoInfo[0].nombre+", causando un daño de: " + danio.toFixed(2)})
                        }
                    }
                }
            }else{
                res.send({status: 400, res:'An unexpected error ocurred.'})
            }
        }
        catch (error) {
            this.handleException(error, res);

        }
    }

}