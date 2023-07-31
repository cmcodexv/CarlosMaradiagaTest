import { Request, Response } from "express";
import { route, GET } from "awilix-express";

@route('/check')
export class DefaultController {
    @GET()
    public index(req: Request, res: Response): void {
        res.send("Run!");
    }
}
