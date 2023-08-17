import { Platform } from "../platform/platform";
import { Player } from "../player/player";
import { Game } from "../game/game";


export class Room {
    id: string;
    creatorPlayer: Player;
    playerCapacity: number;
    players: Player[];
    activePlayers: Player[];
    categories: string[];
    games: Game[];

    constructor(platform: Platform, creatorPlayer: Player, playerCapacity: number) {
        this.id = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();
        while (platform.rooms.filter(e => e.id === this.id).length > 0) {
            this.id = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();
        }
        this.creatorPlayer = creatorPlayer;
        this.playerCapacity = playerCapacity;
        this.players = [this.creatorPlayer,];
        this.activePlayers = [];
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
        if (this.categories.length < this.players.length) {
            this.categories.push(category);
        }
    }

    addActivePlayer(player: Player): void {
        if (this.activePlayers.filter(e => e.id === player.id).length === 0) {
            this.activePlayers.push(player);
        }
    }

    removeActivePlayer(player: Player): void {
        if (this.activePlayers.filter(e => e.id === player.id).length > 0) {
            this.activePlayers = this.activePlayers.filter(e => e.id !== player.id);
        }
    }

    startGame(): Game {
        const game: Game = new Game(this, this.players, this.categories);
        this.games.push(game);
        return game;
    }

    finishGame(game: Game): void {
        if (this.games.filter(e => e.id === game.id).length > 0) {
            this.games = this.games.filter(e => e.id !== game.id);
        }
    }
}
