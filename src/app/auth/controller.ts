import { Request, Response, NextFunction } from "express";
import { ResponseBuilder } from "../../utils";
import { AuthValidator } from "./validator";
import { UserService } from "../../modules/users/service";

export class AuthController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = await AuthValidator.CreateUserValidator(req.body);

            let result = await UserService.getService().createUser(payload);
            const response = ResponseBuilder.okResponse(undefined, result);
            res.status(200).send(response);
        } catch(err: any) {
            next(new Error(err));
        }
    }

    static async requestLogin(req: Request, res: Response, next: NextFunction) {
        try {
            let payload = await AuthValidator.RequestLoginValidator(req.body);
            let result = await UserService.getService().requestLogin(payload);
            const response = ResponseBuilder.okResponse(undefined, result);
            res.status(200).send(response);
        } catch(err: any) {
            next(new Error(err));
        }
    }
}