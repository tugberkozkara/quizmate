import { Player } from "../player/player";


export class Room {
    id: string;
    creatorPlayer: Player;
    playerCapacity: number;
    players: Player[];
    categories: string[];

    constructor(creatorPlayer: Player) {
        this.id = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
        this.creatorPlayer = creatorPlayer;
        this.players = [this.creatorPlayer,];
        this.playerCapacity = 2;
        this.categories = [];
    }

    addPlayer(player: Player): void {
        if (this.players.length < this.playerCapacity) {
            this.players.push(player);
        }
    }

}