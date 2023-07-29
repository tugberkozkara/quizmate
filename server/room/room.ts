import { Player } from "../player/player";
import { Platform } from "../platform/platform";


export class Room {
    id: string;
    creatorPlayer: Player;
    players: Player[];
    capacity: number;

    constructor(platform: Platform, socket: any) {
        this.id = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
        this.creatorPlayer = platform.getPlayerById(socket.id);
        this.players = [this.creatorPlayer,];
        this.capacity = 2;
    }

    addPlayer(player: Player): void {
        if (this.players.length < this.capacity) {
            this.players.push(player);
        }
    }

}