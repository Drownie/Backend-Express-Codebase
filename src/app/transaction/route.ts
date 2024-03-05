import { validateAuthorization } from "../../middleware";
import { IRouteConfiguration } from "../../utils/common.interface";
import { TransactionController } from "./controller";

export const TransactionRoute: IRouteConfiguration[] = [
    {
        method: "POST",
        path: "/api/v1/transaction/create",
        middleware: [ validateAuthorization ],
        handler: TransactionController.createTransaction
    },
    {
        method: "GET",
        path: "/api/v1/transaction/get",
        middleware: [ validateAuthorization ],
        handler: TransactionController.getTransactions
    },
    {
        method: "PATCH",
        path: "/api/v1/transaction/edit",
        middleware: [ validateAuthorization ],
        handler: TransactionController.updateTransaction
    },
    {
        method: "DELETE",
        path: "/api/v1/transaction/delete/:id",
        middleware: [ validateAuthorization ],
        handler: TransactionController.deleteTransaction
    }
]