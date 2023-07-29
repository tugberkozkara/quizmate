import { Room } from '../room/room';

export class Player {
    id: string;
    username: string;

    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
    }

    joinRoom(room: Room): void {
        room.addPlayer(this);
    }
}


