import { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { socket } from "../socket";
import { Alert } from "../components/alerts/Alert";

export default function Homepage({ selfUsername }: { selfUsername: string }) {

  const [roomId, setRoomId] = useState('');
  const [capacity, setCapacity] = useState(2);
  const [roomFullAlert, setRoomFullAlert] = useState(false);
  const [roomNotFoundAlert, setRoomNotFoundAlert] = useState(false);
  const navigate = useNavigate();

  const capacityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(parseInt(e.target.value));
  }

  const roomIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  }

  const createRoom = () => {
    socket.emit('create-room', capacity);
  }

  const joinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('join-room', roomId);
  }

  useEffect(() => {
    socket.on('room-created', (room: any) => {
      navigate(`/room/${room.id}`, { state: { room: room }});
    })

    socket.on('room-joined', (room: any) => {
      setRoomFullAlert(false);
      setRoomNotFoundAlert(false);
      navigate(`/room/${room.id}`, { state: { room: room }});
    })
    
    socket.on('room-is-full', () => {
      setRoomFullAlert(true);
      navigate(`/`);
    })

    socket.on('room-not-found', () => {
      setRoomNotFoundAlert(true);
      navigate(`/`);
    })

  }, [navigate]);


  return (
    <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
      <p className="mb-5 text-muted">
        <NavLink className="mx-2" to="/wtf"><span className="btn btn-outline-secondary">What is that?</span></NavLink>
      </p>
      <h1 className="h3 mb-3 fw-normal">Welcome {selfUsername}</h1>

      {roomFullAlert &&
        <Alert type="warning" heading="Room is full" text="They don't want you..." hasSpinner={false} mutedText=""/>
      }
      {roomNotFoundAlert &&
        <Alert type="warning" heading="Room not found" text="Room with that id doesn't exist..." hasSpinner={false} mutedText=""/>
      }

      <form onSubmit={joinRoom}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Enter room id" name="room-id" value={roomId} onChange={roomIdHandler} required></input>
        </div>
        <p className='mb-0'>
        <button className="btn btn-outline-primary my-2" type='submit'>Join the room</button>
        </p>
      </form>
      <p className='m-4'>or</p>
      <div className="input-group mb-3">
        <label className="form-label text-muted">How many players? {capacity}</label>
        <input type="range"  className="form-range" min="2" max="10" defaultValue={capacity} onChange={capacityHandler} name="price" required></input>
      </div>
      <p className='mb-0'>
      <button className="btn btn-outline-primary my-2" onClick={createRoom}>Create a room</button>
      </p>
    </section>
  )
}

