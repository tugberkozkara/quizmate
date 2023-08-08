import { useState, useEffect } from "react";
import { socket } from "../socket";
import { useNavigate } from 'react-router-dom';


export default function Homepage({ username }: { username: string }) {

  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  // Create a room
  const createRoomHandler = () => {
      socket.emit('create-room', socket.id);
  }


  // Join a room
  const roomIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  }

  const joinRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('join-room', e.currentTarget['room-id'].value);
  }

  useEffect(() => {
    socket.on('room-created', (room: any) => {
      navigate(`/room/${room.id}`, { state: { room: room }});
    })

    socket.on('room-joined', (room: any) => {
      navigate(`/room/${room.id}`, { state: { room: room }});
    })
    
    socket.on('room-is-full', () => {
      console.log('room is full');
      navigate(`/`);
    })
  }, [navigate]);


  return (
    <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
      <p>
        <h1 className="h3 mb-3 fw-normal">Welcome {username}</h1>
      </p>

    <form onSubmit={joinRoomHandler}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Enter room id" name="room-id" value={roomId} onChange={roomIdHandler}></input>
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

