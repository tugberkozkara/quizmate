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
    console.log(room);
});

