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

    removePlayer(player: Player): void {
        if (this.players.filter(e => e.id === player.id).length > 0) {
            this.players = this.players.filter(e => e.id !== player.id);
        }
    }

    addCategory(category: string): void {
        if (this.categories.length < this.playerCapacity) {
            this.categories.push(category);
        }
    }

    startGame(): void {
        console.log("Game started");
    }


}