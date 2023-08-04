import { Room } from '../room/room';
import { Platform } from '../platform/platform';

export class Player {
    id: string;
    username: string;

    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
    }

    createRoom(platform: Platform): Room {
        const room = new Room(this);
        if (platform.rooms.filter(e => e.id === room.id).length === 0) {
            platform.addRoom(room);
        }
        return room;
    }

    joinRoom(platform: Platform, roomId: string): Room | null {
        const room = platform.rooms.filter(e => e.id === roomId)[0];
        if (room.players.length < room.playerCapacity) {
            room.addPlayer(this);
            return room;
        }
        return null;
    }
}


