import { Player } from "../player/player";
import { Room } from "../room/room";


export class Platform {
    players: Player[];
    rooms: Room[];

    constructor() {
        this.players = [];
        this.rooms = [];
    }

    addPlayer(socket: any): Player {
        const player = new Player(socket.id, socket.handshake.auth.username);
        if (this.players.filter(e => e.id === player.id).length === 0) {
            this.players.push(player);
        }
        return this.players.filter(e => e.id === socket.id)[0];
    }

    removePlayer(player: Player): void {
        if (this.players.filter(e => e.id === player.id).length > 0){
            this.players = this.players.filter(e => e.id !== player.id);
        }
    }

    getPlayerById(id: string): Player {
        return this.players.filter(e => e.id === id)[0];
    }

    addRoom(room: Room): void {
        if (this.rooms.filter(e => e.id === room.id).length === 0) {
            this.rooms.push(room);
        }
    }
    
}
