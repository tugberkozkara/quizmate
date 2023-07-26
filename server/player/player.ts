
export class Player {
    id: string;
    username: string;

    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
    }

    static addPlayer(player: Player): Player {
        if (players.filter(e => e.id === player.id).length === 0) {
            players.push(player);
        }
        return player;
    }

    static removePlayer(id: string): void {
        const index = players.findIndex(player => player.id === id);
        players.splice(index, 1);
    }
}

export const players: Player[] = [];


