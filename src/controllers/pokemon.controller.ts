import { Request, Response } from "express";
import { route, GET, POST, PUT, DELETE } from "awilix-express";
import { BaseController } from "../common/controllers/base.controller";
import { PokemonCreateDto, PokemonUpdateDto } from "../dtos/pokemon.dto";
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

    //find by id
    @route('/typeMovementById/:id')
    @GET()
    public async findTypeMovement(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await this.pokemonService.typeMovementById(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send({ status: 404, res: "¡Pokemon no existe o aún se encuentra en modo base!" });
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
    @route('/base/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.pokemonService.update(id, {
                nombre: req.body.nombre,
                nivel: req.body.nivel,
                saludTotal: req.body.saludTotal,
                saludActual: req.body.saludActual,
                ataqueBase: req.body.ataqueBase,
                defensaBase: req.body.defensaBase,
                defensaEspecial: req.body.defensaEspecial,
                ataqueEspecial: req.body.ataqueEspecial,
                velocidad: req.body.velocidad
            } as PokemonUpdateDto);

            res.send({ status: 200, res: "¡Pokemon base actualizado correctamente!" });

        }
        catch (error) {
            this.handleException(error, res);

        }
    }
    //delete
    @route('/base/:id')
    @DELETE()
    public async remove(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            await this.pokemonService.remove(id);

            res.send({ status: 200, res: "¡Pokemon eliminado correctamente!" });
        }
        catch (error) {
            this.handleException(error, res);

        }

    }

}
