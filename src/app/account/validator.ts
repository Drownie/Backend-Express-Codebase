import Joi from "joi";
import { UpdateUserDTO } from "../../modules/users/user.interface";

export class AccountValidator {
    static async UpdateUserValidator(payload: any): Promise<UpdateUserDTO> {
        let objectSchema: Joi.ObjectSchema<UpdateUserDTO>;

        objectSchema = Joi.object({
            name: Joi.string().required()
        });
        return objectSchema.validateAsync(payload, {abortEarly: false});
    }
}