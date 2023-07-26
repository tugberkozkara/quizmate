import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: 'http://localhost:3000',}});
const port = 5000;

io.on('connection', (socket) => {
    console.log(socket.id + " connected");
    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected");
    });
});


server.listen(port, () => {
    console.log(`listening on *:${port}`);
    }
);
