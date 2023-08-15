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
            io.to(room.id).emit("waiting-for-players", room);
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
            io.to(room.id).emit("waiting-for-players", room);
            return;
        }
        io.to(room.id).emit("game-finished", room, game.playerScores);
    }

    static removePlayer = (socket: any, platform: Platform) => {
        const player: Player = platform.players.filter(e => e.id === socket.id)[0];
        platform.removePlayer(player);
    }    

}
