import { IRouteConfiguration } from '../common/common.interface';

// Import Routes
import { UserRoute } from './user/route';

export const routes: IRouteConfiguration[] = [
    ...UserRoute,
]