import { validateAuthorization } from "../../middleware";
import { IRouteConfiguration } from "../../utils/common.interface";
import { AuthController } from "./controller";

export const AccountRoute: IRouteConfiguration[] = [
    {
        method: "GET",
        path: "/api/v1/account/me",
        middleware: [ validateAuthorization ],
        handler: AuthController.getMyAccount
    },
    {
        method: "PATCH",
        path: "/api/v1/account/edit",
        middleware: [ validateAuthorization ],
        handler: AuthController.updateUser
    }
]