import { IRouteConfiguration } from "../utils/common.interface";
import { AccountRoute } from "./account/route";
import { AuthRoute } from "./auth/route";
import { ConsoleRoute } from "./console/route";
import { TransactionRoute } from "./transaction/route";

const routes: IRouteConfiguration[] = [
    ...AuthRoute,
    ...TransactionRoute,
    ...AccountRoute,
    ...ConsoleRoute
]

export default routes;