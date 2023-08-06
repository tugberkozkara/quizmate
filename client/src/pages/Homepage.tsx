import { useState, useEffect } from "react";
import { socket } from "../socket";
import { useNavigate } from 'react-router-dom';


export default function Homepage() {

  const [roomKey, setRoomKey] = useState('');
  const navigate = useNavigate();

  // Create a room
  const createRoomHandler = () => {
      socket.emit('create-room', socket.id);
  }


  // Join a room
  const roomKeyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomKey(e.target.value);
  }

  const joinRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('join-room', e.currentTarget['room-key'].value);
  }

  useEffect(() => {
    socket.on('room-created', (room: any) => {
      navigate(`/room/${room.id}`);
    })
    
    socket.on('room-joined', (room: any) => {
      navigate(`/room/${room.id}`);
    })
    
    socket.on('room-is-full', () => {
      console.log('room is full');
      navigate(`/`);
    })
  }, []);


  return (
    <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
    <form onSubmit={joinRoomHandler}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Enter room key" name="room-key" value={roomKey} onChange={roomKeyHandler}></input>
        </div>
        <p className='mb-0'>
        <button className="btn btn-outline-primary my-2" type='submit'>Join the room</button>
        </p>
      </form>
      <p className='mb-0'>or</p>
      <p className='mb-0'>
      <button className="btn btn-outline-primary my-2" onClick={createRoomHandler}>Create a room</button>
      </p>
</section>
  )
}

