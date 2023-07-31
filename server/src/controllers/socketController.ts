import { Platform } from "../platform/platform";
import { Player } from "../player/player";
import { Room } from "../room/room";

export class socketController {

    static createRoom = (socket: any, platform: Platform) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        const room: Room = player.createRoom(platform);
        socket.emit("room-created", room.id);
        socket.join(room.id);
    }

    static joinRoom = (socket: any, platform: Platform, roomId: string) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        const room: Room | null = player.joinRoom(platform, roomId);
        if (room){
            socket.emit("room-joined", room.id);
            socket.join(room.id);
        }else{
            socket.emit("room-is-full");
        }
    }

    static removePlayer = (socket: any, platform: Platform) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        platform.removePlayer(player);
    }    

}