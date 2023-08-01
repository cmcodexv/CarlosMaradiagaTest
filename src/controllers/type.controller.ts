import { Request, Response } from "express";
import { route, GET, POST, PUT, DELETE } from "awilix-express";
import { BaseController } from "../common/controllers/base.controller";
import { TypeCreateDto, TypeUpdateDto } from "../dtos/type.dto";
import { TypeService } from "../services/type.service";


@route('/types')
export class TypeController extends BaseController {
    constructor(
        private readonly typeService: TypeService
    ) {
        super();
    }

    //all
    @GET()
    public async all(req: Request, res: Response) {
        try {
            res.send(
                await this.typeService.all()
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
            const result = await this.typeService.find(id);

            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send({ status: 404, res: "¡Tipo no existe!" });
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
            await this.typeService.store({
                nombre: req.body.nombre
            } as TypeCreateDto);
            res.send({ status: 200, res: "¡Tipo " + req.body.nombre + " creado correctamente!" });
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
            await this.typeService.update(id, {
                nombre: req.body.nombre
            } as TypeUpdateDto);

            res.send({ status: 200, res: "¡Tipo actualizado correctamente!" });

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

            await this.typeService.remove(id);

            res.send({ status: 200, res: "¡Tipo eliminado correctamente!" });
        }
        catch (error) {
            this.handleException(error, res);

        }

    }





}
