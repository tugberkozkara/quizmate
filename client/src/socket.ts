import io from 'socket.io-client';

const URL = "http://localhost:5000";
export const socket = io(URL, {autoConnect: false});

socket.on('connect', () => {
    console.log(socket.id + ' connected');
});

socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected');
});

socket.on("room-created", (room: any) => {
    console.log(room.id + "room-created");
});

socket.on("room-is-full", () => {
    console.log("room-is-full");
});

socket.on("room-joined", (room: any) => {
    console.log(room.id + "room-joined");
});


