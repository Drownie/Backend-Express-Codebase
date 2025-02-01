import { Request, Response, NextFunction } from "express";

export interface IRouteConfiguration {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    handler: (req: Request, res: Response, next: NextFunction) => void;
    middleware?: ((req: Request, res: Response, next: NextFunction) => void)[];
}