import { Request, Response } from "express";
import { route, GET, POST, PUT, DELETE } from "awilix-express";
import { BaseController } from "../common/controllers/base.controller";
import { MovementCreateDto, MovementUpdateDto } from "../dtos/movement.dto";
import { MovementService } from "../services/movement.service";


@route('/movements')
export class MovementController extends BaseController {
    constructor(
        private readonly movementService: MovementService
    ) {
        super();
    }

    //all
    @GET()
    public async all(req: Request, res: Response) {
        try {
            res.send(
                await this.movementService.all()
            );

        } catch (error) {
            this.handleException(error, res);

        }
    }
    //find by id
    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await this.movementService.find(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send({ status: 404, res: "¡Movimiento no existe!" });
            }

        }
        catch (error) {
            this.handleException(error, res);

        }
    }

    //post
    @POST()
    public async store(req: Request, res: Response) {
        try {
            await this.movementService.store({
                nombre: req.body.nombre,
                tipoId: req.body.tipoId,
                categoria: req.body.categoria,
                poder: req.body.poder,
                acc: req.body.acc,
                pp: req.body.pp,
                efecto: req.body.efecto,
                probabilidad: req.body.probabilidad
            } as MovementCreateDto);
            res.send({ status: 200, res: "¡Movimiento " + req.body.nombre + " creado correctamente!" });
        }
        catch (error) {
            this.handleException(error, res);

        }
    }
    //update
    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.movementService.update(id, {
                nombre: req.body.nombre,
                tipoId: req.body.tipoId,
                categoria: req.body.categoria,
                poder: req.body.poder,
                acc: req.body.acc,
                pp: req.body.pp,
                efecto: req.body.efecto,
                probabilidad: req.body.probabilidad
            } as MovementUpdateDto);

            res.send({ status: 200, res: "¡Movimiento actualizado correctamente!" });

        }
        catch (error) {
            this.handleException(error, res);

        }
    }
        //delete
        @route('/:id')
        @DELETE()
        public async remove(req: Request, res: Response) {
            try {
                const id = parseInt(req.params.id);
    
                await this.movementService.remove(id);
    
                res.send({ status: 200, res: "¡Movimiento eliminado correctamente!" });
            }
            catch (error) {
                this.handleException(error, res);
    
            }
    
        }

}
