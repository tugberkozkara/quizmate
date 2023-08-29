import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

import { Platform } from "./platform/platform";
import { socketRouter } from "./routers/socketRouter";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CORS_ORIGIN, } });
const PORT = process.env.PORT || 5000;

const platform = new Platform();

io.on('connection', (socket) => {
    platform.addPlayer(socket);
    socketRouter(io, socket, platform);
});


server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
}
);
