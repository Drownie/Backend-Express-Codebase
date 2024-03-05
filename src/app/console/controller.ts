import { Request, Response, NextFunction } from "express";
import { ResponseBuilder } from "../../utils";

export class ConsoleController {
    static async test(req: Request, res: Response, next: NextFunction) {
        try {
            const statusCode = 200;
            const response = ResponseBuilder.okResponse('MANTAP', statusCode);
            res.status(statusCode).send(response);
        } catch(err: any) {
            next(new Error(err));
        }
    }
}