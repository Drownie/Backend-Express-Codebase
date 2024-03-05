import { IRouteConfiguration } from "../../utils/common.interface";
import { ConsoleController } from "./controller";

export const ConsoleRoute: IRouteConfiguration[] = [
    {
        method: "GET",
        path: "/test",
        handler: ConsoleController.test
    }
]