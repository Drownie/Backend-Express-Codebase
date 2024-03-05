import { Request, Response, NextFunction } from "express";
import { ResponseBuilder } from "../../utils";
import { UserService } from "../../modules/users/service";
import { AccountValidator } from "./validator";

export class AuthController {
    static async getMyAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const externalId = req.headers.uid;
            const query = req.query;

            let result = await UserService.getService().getMyAccount(externalId, query);
            const response = ResponseBuilder.okResponse(undefined, result);
            res.status(200).send(response);
        } catch(err: any) {
            next(new Error(err));
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const externalId = req.headers.uid;
            const payload = await AccountValidator.UpdateUserValidator(req.body);

            let result = await UserService.getService().UpdateUser(externalId, payload);
            const response = ResponseBuilder.okResponse(undefined, result);
            res.status(200).send(response);
        } catch(err: any) {
            next(new Error(err));
        }
    }
}