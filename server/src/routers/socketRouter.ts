import { socketController } from "../controllers/socketController";

export const socketRouter = (io: any, socket: any, platform: any) => {
    socket.on('create-room', () => socketController.createRoom(socket, platform));
    socket.on('join-room', (roomId: string) => socketController.joinRoom(io, socket, platform, roomId));
    socket.on('leave-room', (roomId: string) => socketController.leaveRoom(io, socket, platform, roomId));
    socket.on('add-category', (roomId: string, category: string) => socketController.addCategory(io, socket, platform, roomId, category));
    socket.on('start-game', (roomId: string) => socketController.startGame(io, socket, platform, roomId));
    socket.on('disconnect', () => socketController.removePlayer(socket, platform));
}
