
import { UserController } from "./controller";
import { IRouteConfiguration } from '../../common/common.interface';

export const UserRoute: IRouteConfiguration[] = [
    {
        method: "get",
        path: "/api/v1/users",
        handler: UserController.getUserList
    },
]