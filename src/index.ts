import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from "express";
import dataSource from './data-source';

import { routes } from './app';
import { setting, corsOptions } from './config/setting';
import { ResponseBuilder } from './common/responseBuilder';

export const app = express();

// Cors Config
app.use(cors(corsOptions));

// Body parser
app.use(bodyParser.json({ type: 'application/json', limit: '1mb'}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.text({ type: 'application/xml' }));

// Public
// app.use(express.static(path.join(__dirname, '..', 'public')));

// Init Datasource
dataSource.initialize()
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(`Database Init Error: ${JSON.stringify(err)}`));

for (let route of routes) {
    const middleware = route.middleware;
    const handler = route.handler;
    const method = route.method;
    const path = route.path;

    if (middleware) {
        console.log(`[${method}] ${path} - has ${middleware.length} middlewares`);
        app[method](path, ...middleware, handler);
    } else {
        console.log(`[${method}] ${path} - has 0 middlewares`);
        app[method](path, handler);
    }
}

app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`Request on [${req.method}](${req.path})`);
    next()
})

// Error Handler
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    const errorResponse = ResponseBuilder.errorBuilder(error.message);
    res.status(500).send(errorResponse);
});

app.listen(setting.app_port, () => {
    console.log(`Server is now listening to env : ${setting.app_env}, port : ${setting.app_port}`)
});