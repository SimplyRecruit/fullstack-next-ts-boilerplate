import 'reflect-metadata' /* this shim is required */
import express, { Request, Response } from "express"
import next from "next"
import { DataSource, DefaultNamingStrategy } from "typeorm"
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { useExpressServer } from 'routing-controllers'
import { SampleController } from './controllers/sample'

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

// Resolving environment variables
import "dotenv/config"

// Importing entities
import { PersonEntity } from "./entities/PersonEntity"
import { HatEntity } from "./entities/HatEntity"

// Connecting to DB
const dataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_CSTR,
    entities: [PersonEntity, HatEntity],
    logging: true,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
})

dataSource.initialize().then(() => {
    console.info("Connected to DB")
}).catch((error: unknown) => {
    console.error("Error connecting to DB:")
    console.error(error)
});

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

