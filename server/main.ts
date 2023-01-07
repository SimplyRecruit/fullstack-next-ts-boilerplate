import express, { Request, Response } from "express";
import next from "next";

import 'reflect-metadata';/* this shim is required */
import { useExpressServer } from 'routing-controllers';
import { SampleController } from './controllers/sample';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
    try {
        // Create express server
        await app.prepare();
        const server = express();
        useExpressServer(server, {
            controllers: [SampleController], // we specify controllers we want to use
            routePrefix: '/api',
            validation: { dismissDefaultMessages: true },
            cors: true
        });

        // Send 404 for not found APIs
        server.all('/api/*', (req: Request, res: Response) => {
            if (!res.writableEnded) res.status(404).send("API not found")
            else res.end()
        })

        // Send to frontend if url does not start with /api
        server.all('*', (req: Request, res: Response) => {
            return handle(req, res);
        });

        // Start listening to requests
        server.listen(port, (err?: unknown) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();

