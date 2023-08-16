import { Platform } from "../platform/platform";
import { Player } from "../player/player";
import { Room } from "../room/room";
import { Game } from "../game/game";

export class socketController {

    static createRoom = (socket: any, platform: Platform) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        const room: Room = player.createRoom(platform);
        socket.join(room.id);
        socket.emit("room-created", room);
    }

    static joinRoom = (io: any, socket: any, platform: Platform, roomId: string) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        const room: Room = platform.rooms.filter(e => e.id === roomId)[0];
        if(room != undefined){
            if(room.players.length < room.playerCapacity){
                player.joinRoom(platform, room.id);
                socket.join(room.id);
                io.to(room.id).emit("room-joined", room);
                return;
            }
            socket.emit("room-is-full");
            return;
        }
        socket.emit("room-not-found");
    }

    static leaveRoom = (io: any, socket: any, platform: Platform, roomId: string) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        const room: Room = platform.rooms.filter(e => e.id === roomId)[0];
        player.leaveRoom(platform, room.id);
        if (room.players.length === 0){
            platform.removeRoom(room.id);
        }
        socket.leave(room.id);
        io.to(room.id).emit("room-left", room, player);
    }

    static addCategory = (io: any, socket: any, platform: Platform, roomId: string, category: string) => {
        const room: Room = platform.rooms.filter(e => e.id === roomId)[0];
        room.addCategory(category);
        io.to(room.id).emit("category-added", room);
    }

    static startGame = (io: any, socket: any, platform: Platform, roomId: string) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        const room: Room = platform.rooms.filter(e => e.id === roomId)[0];
        room.addActivePlayer(player);
        if(room.activePlayers.length < room.playerCapacity){
            socket.emit("waiting-for-players", room);
            return;
        }
        const game: Game = room.startGame();
        io.to(room.id).emit("game-started", room, game);
    }

    static finishGame = (io: any, socket: any, platform: Platform, roomId: string, gameId: string, selfAnswers: any) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        const room: Room = platform.rooms.filter(e => e.id === roomId)[0];
        const game: Game = room.games.filter(e => e.id === gameId)[0];
        game.addPlayerAnswers(player, selfAnswers);
        room.removeActivePlayer(player);
        if(room.activePlayers.length > 0){
            socket.emit("waiting-for-players", room);
            return;
        }
        io.to(room.id).emit("game-finished", room, game);
    }

    static removePlayer = (socket: any, platform: Platform) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        platform.removePlayer(player);
    }    

}
