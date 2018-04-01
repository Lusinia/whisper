import { createServer, Server } from 'http';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as fileUpload from 'express-fileupload';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import * as cookieSession from 'cookie-session';
import * as SocketIO from 'socket.io';

import { IMessage } from './models';
import { AuthRoutes, LayoutRoutes, ProductsRoutes, UsersRoutes } from './routes';
import { Chat } from './mongoModels/Chat';
import { IChat } from './models/chat.model';

const keys = require('./config/keys').keys;

// mongoose.connect(keys.mongoURI);

export class ChatServer {
    public static readonly PORT: number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;
    private room: string;

    constructor() {
        this.createApp();
        this.configPort();
        this.setMiddleware();
        this.createServer();
        this.sockets();
        this.getPassportConfig();
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
        // console.log('process', process.env);
    }

    private setMiddleware(): void {
        try {
            this.app.use( (req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, PATCH");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                res.header('X-HTTP-Method-Override', 'DELETE');
                res.header('X-HTTP-Method-Override', 'PUT');
                next();
            });

            // this.app.use(bodyParser.urlencoded({extended: true}));
            this.app.use(bodyParser.urlencoded());
            this.app.use(bodyParser.json());
            this.app.use(fileUpload());
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
        this.app.use('/auth', AuthRoutes);
    }
    private getPassportConfig() {
        require('./services/passport');
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

            const defaultRoom = 'general';
            const rooms = ["General", "angular", "socket.io", "express", "node", "mongo", "PHP", "laravel"];

            //Emit the rooms array
            socket.emit('setup', {
                rooms: rooms
            });

            let sockeRoom = null;
            socket.on('room', function(room) {
                socket.join(room);
                sockeRoom = room;
                console.log('room', room, this);
                // socket.emit('message', '!!!!!!!!what is going on, party people?');
                // socket.in('testroom').emit('message', '!!!!!!!!what is going on, party people?');

            });

            //Listens for new user
            socket.on('new user', function(data) {
                data.room = defaultRoom;
                //New user joins the default room
                socket.join(defaultRoom);
                //Tell all those in the room that a new user joined
                this.io.in(defaultRoom).emit('user joined', data);
            });
//Listens for switch room
            socket.on('switch room', function(data) {
                //Handles joining and leaving rooms
                //console.log(data);
                socket.leave(data.oldRoom);
                socket.join(data.newRoom);
                this.io.in(data.oldRoom).emit('user left', data);
                this.io.in(data.newRoom).emit('user joined', data);

            });


            socket.on('message', (m: IMessage) => {
                this.io.in(sockeRoom).emit('message',  m.message);
                // this.io.emit('message', m['content']);
            });

            socket.on('new message', (data: IMessage) => {
                //Create message
                const newMsg = new Chat({
                    username: data.username,
                    content: data.message,
                    room: data.room.toLowerCase(),
                    created: new Date()
                });
                newMsg.save((err, msg) => {
                    //Send message to those connected in the room
                    this.io.in(msg.room).emit('message created', msg);
                });
            });

            socket.on('leave', function(room){
                socket.leave(room);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
    sendRoomMessage(room: string){
        this.io.in('testroom').emit('message', '!!!!!!!!what is going on, party people?');
    }
}

/*

// attach Socket.io to our HTTP server
io = socketio.listen(server);

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        socket.join(room);
    });
});

// now, it's easy to send a message to just the clients in a given room
room = "abc123";
io.sockets.in(room).emit('message', 'what is going on, party people?');

// this message will NOT go to the client defined above
io.sockets.in('foobar').emit('message', 'anyone in this room yet?');

 */