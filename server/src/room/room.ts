import { Player } from "../player/player";


export class Room {
    id: string;
    creatorPlayer: Player;
    players: Player[];
    capacity: number;

    constructor(creatorPlayer: Player) {
        this.id = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
        this.creatorPlayer = creatorPlayer;
        this.players = [this.creatorPlayer,];
        this.capacity = 2;
    }

    addPlayer(player: Player): void {
        if (this.players.length < this.capacity) {
            this.players.push(player);
        }
    }

}