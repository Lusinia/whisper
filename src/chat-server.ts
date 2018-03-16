import { createServer, Server } from 'http';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import * as cookieSession from 'cookie-session';
import * as SocketIO from 'socket.io';

import { Message } from './models';
import { LayoutRoutes, ProductsRoutes, UsersRoutes } from './routes';

const keys = require('./config/keys').keys;

mongoose.connect(keys.mongoURI);

export class ChatServer {
    public static readonly PORT: number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.configPort();
        this.setMiddleware();
        this.createServer();
        this.sockets();
        this.getRoutes();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private configPort(): void {
        this.port = process.env['PORT'] || ChatServer.PORT;
    }

    private setMiddleware(): void {
        try {
            this.app.use( (req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                res.header('X-HTTP-Method-Override', 'DELETE');
                res.header('X-HTTP-Method-Override', 'PUT');
                next();
            });

            this.app.use(bodyParser.urlencoded({extended: true}));
            this.app.use(
                cookieSession({
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
                    keys: [keys.cookieKey] // like secret for encode cookie
                })
            );

            this.app.use(passport.initialize());
            this.app.use(passport.session()); 
        } catch (err) {
            console.log(err);
        }
       
    }

    private getRoutes() {
        this.app.use('/', LayoutRoutes);
        this.app.use('/products', ProductsRoutes);
        this.app.use('/users', UsersRoutes);
    }

    private sockets(): void {
        this.io = SocketIO(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port ', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port ', this.port);
            socket.on('message', (m: Message) => {
                console.log('[server](message): ', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
