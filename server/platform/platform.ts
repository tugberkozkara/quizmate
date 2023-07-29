import { Player } from "../player/player";
import { Room } from "../room/room";


export class Platform {
    players: Player[];
    rooms: Room[];

    constructor() {
        this.players = [];
        this.rooms = [];
    }

    addPlayer(io: any): void {
        for(let [id, socket] of io.of("/").sockets) {
            const player = new Player(id, socket.handshake.auth.username);
            if (this.players.filter(e => e.id === player.id).length === 0) {
                this.players.push(player);
            }
        }
    }

    removePlayer(id: string): void {
        this.players = this.players.filter(e => e.id !== id);
    }

    getPlayerById(id: string): Player {
        return this.players.filter(e => e.id === id)[0];
    }

    createRoom(socket: any): void {
        const room = new Room(this, socket);
        if (this.rooms.filter(e => e.id === room.id).length === 0) {
            this.rooms.push(room);
        }
    }
}
