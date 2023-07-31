import { Request, Response } from "express";
import { route, GET} from "awilix-express";
import { BaseController } from "../common/controllers/base.controller";
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
                res.send();
            }

        }
        catch (error) {
            this.handleException(error, res);

        }
    }





}
