import express from "express";
import http from "http";
import { Server } from "socket.io";

import { Player } from "./player/player";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: 'http://localhost:3000',}});
const port = 5000;

io.on('connection', (socket) => {
    console.log(socket.id + " connected");

    for(let [id, socket] of io.of("/").sockets) {
        const player = new Player(id, socket.handshake.auth.username);
        Player.addPlayer(player);
    }

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected");
        Player.removePlayer(socket.id);
    });
});


server.listen(port, () => {
    console.log(`listening on *:${port}`);
    }
);
