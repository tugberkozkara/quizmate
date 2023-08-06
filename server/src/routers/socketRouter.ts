import { socketController } from "../controllers/socketController";

export const socketRouter = (socket: any, platform: any) => {
    socket.on('create-room', () => socketController.createRoom(socket, platform));
    socket.on('join-room', (roomId: string) => socketController.joinRoom(socket, platform, roomId));
    socket.on('leave-room', (roomId: string) => socketController.leaveRoom(socket, platform, roomId));
    socket.on('start-game', (roomId: string, category: string) => socketController.startGame(socket, platform, roomId, category));
    socket.on('disconnect', () => socketController.removePlayer(socket, platform));
}
