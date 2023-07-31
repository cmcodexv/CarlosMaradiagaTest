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
                'SELECT t.tipoId as tipo ,p.ataqueBase, p.defensaBase,p.nivel FROM pokemonTipo as pt INNER JOIN tipo as t ON pt.tipoId = t.tipoId INNER JOIN pokemon as p ON p.pokemonId = pt.pokemonId WHERE p.pokemonId = ? AND p.activo = 1 limit 1',
                [pokemonId]
            );
            if (pokemonInfo.length) {
                //rival
                const [pokemonRivalInfo]: any[] = await connector.execute(
                    'SELECT t.tipoId as tipo ,p.ataqueBase, p.defensaBase FROM pokemonTipo as pt INNER JOIN tipo as t ON pt.tipoId = t.tipoId INNER JOIN pokemon as p ON p.pokemonId = pt.pokemonId WHERE p.pokemonId = ? AND p.activo = 1 limit 1',
                    [pokemonRivalId]
                );
                if (pokemonRivalInfo.length) {
                    //mov
                    const [movimientoInfo]: any[] = await connector.execute(
                        'SELECT poder FROM movimiento WHERE movimientoId = ? AND activo = 1',
                        [movimientoId]
                    );
                    if (movimientoInfo.length) {
                        //efectividad
                        const [efectividad]: any[] = await connector.execute(
                            'SELECT operacion, resultado FROM efectividad WHERE tipoAtaque = ? AND tipoDefensa = ? AND activo = 1',
                            [pokemonInfo[0].tipo, pokemonRivalInfo[0].tipo]
                        );
                        if (efectividad.length) {
                            //helper
                            const rango = ((100 - 85) / 2) - 1;
                            let random: number;
                            random = 2 * Math.floor(Math.random() * rango) + 1 + 85;

                            //formula
                            let danio;
                           // danio = {[(2 * pokemonInfo[0].nivel / 5 + 2) * pokemonInfo[0].ataqueBase * movimientoInfo[0].poder / pokemonRivalInfo[0].defensaBase]/50} * efectividad * random / 100;
                        }
                    }
                }
            }
        }
        catch (error) {
            this.handleException(error, res);

        }
    }

}