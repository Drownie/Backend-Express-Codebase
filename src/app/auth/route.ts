import { IRouteConfiguration } from "../../utils/common.interface";
import { AuthController } from "./controller";

export const AuthRoute: IRouteConfiguration[] = [
    {
        method: "POST",
        path: "/api/v1/auth/register",
        handler: AuthController.registerUser
    }, {
        method: "POST",
        path: "/api/v1/auth/requestLogin",
        handler: AuthController.requestLogin
    }
]