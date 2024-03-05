import Joi from "joi";
import { CreateUserDTO } from "../../modules/users/user.interface";

export class AuthValidator {
    static async CreateUserValidator(payload: any): Promise<CreateUserDTO> {
        let objectSchema: Joi.ObjectSchema<CreateUserDTO>;

        objectSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            confirm_password: Joi.ref('password')
        }).with('password', 'confirm_password');
        return objectSchema.validateAsync(payload, {abortEarly: false});
    }

    static async RequestLoginValidator(payload: any): Promise<CreateUserDTO> {
        let objectSchema: Joi.ObjectSchema<CreateUserDTO>;

        objectSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        });
        return objectSchema.validateAsync(payload, {abortEarly: false});
    }
}