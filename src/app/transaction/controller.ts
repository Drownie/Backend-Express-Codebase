import { Request, Response, NextFunction } from "express";
import { ResponseBuilder } from "../../utils";
import { TransactionValidator } from "./validator";
import { TransactionService } from "../../modules/transaction/service";

export class TransactionController {
    static async createTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            const externalId = req.headers.uid;
            const payload = await TransactionValidator.CreateTransactionValidation(req.body);

            let result = await TransactionService.getService().createTransaction(externalId, payload);
            const response = ResponseBuilder.okResponse(undefined, result);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    }

    static async getTransactions(req: Request, res: Response, next: NextFunction) {
        try {
            const externalId = req.headers.uid;
            const query = req.query;

            let result = await TransactionService.getService().getTransactions(externalId, query);
            const response = ResponseBuilder.okResponse(undefined, result.data, result.detail);
            res.status(200).send(response);
        } catch(err: any) {
            next(new Error(err));
        }
    }

    static async updateTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            const externalId = req.headers.uid;
            const payload = await TransactionValidator.UpdateTransactionValidation(req.body);

            let result = await TransactionService.getService().updateTransaction(externalId, payload);
            const response = ResponseBuilder.okResponse(undefined, result);
            res.status(200).send(response);
        } catch(err: any) {
            next(new Error(err));
        }
    }

    static async deleteTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            const externalId = req.headers.uid;
            const transactionId = req.params.id;

            let result = await TransactionService.getService().deleteTransaction(externalId, transactionId);
            const response = ResponseBuilder.okResponse(undefined, result);
            res.status(200).send(response);
        } catch(err: any) {
            next(new Error(err));
        }
    }
}