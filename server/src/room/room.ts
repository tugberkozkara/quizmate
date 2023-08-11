import { Player } from "../player/player";
import { Game } from "../game/game";


export class Room {
    id: string;
    creatorPlayer: Player;
    playerCapacity: number;
    players: Player[];
    categories: string[];
    games: string[];

    constructor(creatorPlayer: Player) {
        this.id = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
        this.creatorPlayer = creatorPlayer;
        this.players = [this.creatorPlayer,];
        this.playerCapacity = 2;
        this.categories = [];
        this.games = [];
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

    startGame(): Game {
        const game: Game = new Game(this.id, this.players, this.categories);
        this.games.push(game.id);
        return game;
    }
}
