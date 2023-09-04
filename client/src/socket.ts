import io from 'socket.io-client';

const URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
export const socket = io(URL, {autoConnect: false});
