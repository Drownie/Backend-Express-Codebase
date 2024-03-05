import { Request, Response, NextFunction } from "express";
import { OrderByEnum } from "./common.enum";

export interface IRouteConfiguration {
    method: string;
    path: string;
    handler: (req: Request, res: Response, next: NextFunction) => void;
    middleware?: ((req: Request, res: Response, next: NextFunction) => void)[];
}

export interface IExtraParams {
    limit?: number,
    offset?: any,
    orderField?: string,
    orderBy?: OrderByEnum,
    select?: string,
    alias?: string,
    join?: string
}