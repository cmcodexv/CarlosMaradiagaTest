import { Request, Response } from "express";
import { route, GET, POST, PUT, DELETE } from "awilix-express";
import { BaseController } from "../common/controllers/base.controller";
import { PokemonCreateDto } from "../dtos/pokemon.dto";
import { PokemonService } from "../services/pokemon.service";


@route('/pokemons')
export class MovementController extends BaseController {
    constructor(
        private readonly pokemonService: PokemonService
    ) {
        super();
    }

    //all
    @GET()
    public async all(req: Request, res: Response) {
        try {
            res.send(
                await this.pokemonService.all()
            );

        } catch (error) {
            this.handleException(error, res);

        }
    }
    @route('/base')
    @GET()
    public async allBase(req: Request, res: Response) {
        try {
            res.send(
                await this.pokemonService.allBase()
            );

        } catch (error) {
            this.handleException(error, res);

        }
    }
    //find by id
    @route('/base/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await this.pokemonService.find(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send({ status: 404, res: "¡Pokemon base no existe!" });
            }

        }
        catch (error) {
            this.handleException(error, res);

        }
    }

    //post
    @route('/base')
    @POST()
    public async store(req: Request, res: Response) {
        try {
            await this.pokemonService.store({
                nombre: req.body.nombre,
                nivel: req.body.nivel,
                poder: req.body.poder,
                saludTotal: req.body.saludTotal,
                saludActual: req.body.saludActual,
                ataqueBase: req.body.ataqueBase,
                defensaBase: req.body.defensaBase,
                defensaEspecial: req.body.defensaEspecial,
                ataqueEspecial: req.body.ataqueEspecial,
                velocidad: req.body.velocidad
            } as PokemonCreateDto);
            res.send({ status: 200, res: "¡Pokemon " + req.body.nombre + " (base) creado correctamente!" });
        }
        catch (error) {
            this.handleException(error, res);

        }
    }
    //update
    // @route('/:id')
    // @PUT()
    // public async update(req: Request, res: Response) {
    //     try {
    //         const id = parseInt(req.params.id);
    //         await this.movementService.update(id, {
    //             nombre: req.body.nombre,
    //             tipoId: req.body.tipoId,
    //             categoria: req.body.categoria,
    //             poder: req.body.poder,
    //             acc: req.body.acc,
    //             pp: req.body.pp,
    //             efecto: req.body.efecto,
    //             probabilidad: req.body.probabilidad
    //         } as MovementUpdateDto);

    //         res.send({ status: 200, res: "¡Movimiento actualizado correctamente!" });

    //     }
    //     catch (error) {
    //         this.handleException(error, res);

    //     }
    // }
    //delete
    // @route('/:id')
    // @DELETE()
    // public async remove(req: Request, res: Response) {
    //     try {
    //         const id = parseInt(req.params.id);

    //         await this.movementService.remove(id);

    //         res.send({ status: 200, res: "¡Movimiento eliminado correctamente!" });
    //     }
    //     catch (error) {
    //         this.handleException(error, res);

    //     }

    // }

}
