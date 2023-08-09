import express from "express";
import http from "http";
import { Server } from "socket.io";

import { Platform } from "./platform/platform";
import { socketRouter } from "./routers/socketRouter";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: 'http://localhost:3000',}});
const port = 5000;

const platform = new Platform();

io.on('connection', (socket) => {
    platform.addPlayer(socket);
    socketRouter(io, socket, platform);
});


server.listen(port, () => {
    console.log(`listening on *:${port}`);
    }
);
