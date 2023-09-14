import { Platform } from "../platform/platform";
import { Player } from "../player/player";
import { Game } from "../game/game";


type playerResults = {
    player: Player;
    score: number;
}

export class Room {
    id: string;
    creatorPlayer: Player;
    playerCapacity: number;
    players: Player[];
    activePlayers: Player[];
    categories: string[];
    games: Game[];
    results: playerResults[];

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
        this.results = [{ player: this.creatorPlayer, score: 0 },];
    }

    addPlayer(player: Player): void {
        if (this.players.length < this.playerCapacity) {
            this.players.push(player);
            this.results.push({ player: player, score: 0 });
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

    removeAllCategories(): void {
        this.categories = [];
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
        this.removeAllCategories();
        let winner: Player = game.playerResults[0].player;
        let highestScore: number = game.playerResults[0].score;
        let highestTimeLeft: number = game.playerResults[0].timeLeft;
        game.playerResults.forEach(e => {
            if (e.score > highestScore || (e.score === highestScore && e.timeLeft > highestTimeLeft)) {
                winner = e.player;
                highestScore = e.score;
                highestTimeLeft = e.timeLeft;
            }
        });
        this.results.forEach(e => {
            if (e.player.id === winner.id) {
                e.score++;
            }
        });
    }
}
