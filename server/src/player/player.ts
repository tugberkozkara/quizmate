import { Room } from '../room/room';
import { Platform } from '../platform/platform';

export class Player {
    id: string;
    username: string;

    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
    }

    createRoom(platform: Platform, capacity: number): Room {
        const room = new Room(platform, this, capacity);
        platform.addRoom(room);
        return room;
    }

    joinRoom(platform: Platform, roomId: string): void {
        const room = platform.rooms.filter(e => e.id === roomId)[0];
        room.addPlayer(this);
    }

    leaveRoom(platform: Platform, roomId: string): void {
        const room = platform.rooms.filter(e => e.id === roomId)[0];
        room.removePlayer(this);
    }
    
}


