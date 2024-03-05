import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from "express";

import * as routes from './app';
import { _Database } from './database';
import { setting, corsOptions } from './config/setting';
import { ResponseBuilder } from './utils';
import { getRDSConnection } from './database/postgresql';

export const app = express();

// Cors Config
app.use(cors(corsOptions));

// Body parser
app.use(bodyParser.json({ type: 'application/json', limit: '1mb'}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.text({ type: 'application/xml' }));

getRDSConnection().then(() => {
    console.log('Successfully Connected to the DB')
});

for (let eachRoute of routes.default) {
    const middleware = eachRoute.middleware;
    const handler = eachRoute.handler;
    const method = eachRoute.method;
    const path = eachRoute.path;

    console.log(method, "->", path);

    if (middleware) {
        app[method.toLowerCase() as 'get' | 'post' | 'put' | 'delete'](path, ...middleware, handler);
    } else {
        app[method.toLowerCase() as 'get' | 'post' | 'put' | 'delete'](path, handler);
    }
}

// Error Handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    const errorResponse = ResponseBuilder.errorBuilder(error.message);
    res.status(500).send(errorResponse);
});

const port = setting.port;
app.listen(port, () => console.log(`Listening on PORT ${port}`));