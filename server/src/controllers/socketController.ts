import { Platform } from "../platform/platform";
import { Player } from "../player/player";
import { Room } from "../room/room";

export class socketController {

    static createRoom = (socket: any, platform: Platform) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        const room: Room = player.createRoom(platform);
        socket.join(room.id);
        socket.emit("room-created", room);
    }

    static joinRoom = (io: any, socket: any, platform: Platform, roomId: string) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        const room: Room | null = player.joinRoom(platform, roomId);
        if (room){
            socket.join(room.id);
            io.to(room.id).emit("room-joined", room);
        }else{
            socket.emit("room-is-full");
        }
    }

    static leaveRoom = (io: any, socket: any, platform: Platform, roomId: string) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        const room: Room = platform.rooms.filter(e => e.id === roomId)[0];
        player.leaveRoom(platform, room.id);
        socket.leave(room.id);
        socket.emit("room-left");
    }

    static startGame = (io: any, socket: any, platform: Platform, roomId: string, category: string) => {
        const room: Room = platform.rooms.filter(e => e.id === roomId)[0];
        room.addCategory(category);
        if(room.categories.length < room.playerCapacity){
            socket.emit("waiting-for-players", room);
            return;
        }
        room.startGame();
        io.to(room.id).emit("game-started", room);
    }

    static removePlayer = (socket: any, platform: Platform) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        platform.removePlayer(player);
    }    

}