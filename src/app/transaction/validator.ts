import Joi from "joi";
import { CreateTransactionDTO, UpdateTransactionDTO } from "../../modules/transaction/transaction.interface";
import { CategoryTypeEnum, TransactionTypeEnum } from "../../utils";

export class TransactionValidator {
    static async CreateTransactionValidation(payload: any): Promise<CreateTransactionDTO> {
        let objectSchema: Joi.ObjectSchema<CreateTransactionDTO>;

        objectSchema = Joi.object({
            transaction_amount: Joi.number().required(),
            category_type: Joi.string().valid(...Object.values(CategoryTypeEnum)).required(),
            transaction_type: Joi.string().valid(...Object.values(TransactionTypeEnum)).required(),
            icon_url: Joi.string().required()
        });
        return objectSchema.validateAsync(payload, {abortEarly: false});
    }

    static async UpdateTransactionValidation(payload: any): Promise<UpdateTransactionDTO> {
        let objectSchema: Joi.ObjectSchema<UpdateTransactionDTO>;

        objectSchema = Joi.object({
            transaction_id: Joi.string().uuid({version: "uuidv4"}).required(),
            transaction_amount: Joi.number().optional(),
            category_type: Joi.string().valid(...Object.values(CategoryTypeEnum)).optional(),
            transaction_type: Joi.string().valid(...Object.values(TransactionTypeEnum)).optional(),
            icon_url: Joi.string().optional()
        });

        return objectSchema.validateAsync(payload, {abortEarly: false});
    }
}