import { useState } from "react";
import { socket } from "../../socket";

export const JoinRoom = () => {
    const [roomId, setRoomId] = useState('');

    const roomIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(e.target.value);
    }

    const joinRoom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit('join-room', roomId);
    }

  return (
    <div className="text-center align-self-center">
    <form onSubmit={joinRoom}>
        <div className="input-group mb-3">
          <input type="number" className="form-control" placeholder="Enter room id" name="room-id" value={roomId} onChange={roomIdHandler} required></input>
        </div>
        <p className='mb-0'>
          <button className="btn btn-outline-primary my-2" type='submit'>Join the room</button>
        </p>
    </form>
    </div>
  )
}
