import { Request, Response, NextFunction } from "express";
import { ErrorBuilder } from "../../common/errorBuilder";
import { ResponseBuilder } from '../../common/responseBuilder';
import { UserService } from "../../modules/user/service";

export class UserController {
    static async getUserList(_req: Request, res: Response, next: NextFunction) {
        try {
            let result = await UserService.getUserList();
            const response = ResponseBuilder.okResponse(undefined, result);
            return res.status(200).send(response);
        } catch(err) {
            if (err instanceof ErrorBuilder) {
                next(err);
            } else {
                next(new ErrorBuilder(JSON.stringify(err)));
            }
        }
    }
}