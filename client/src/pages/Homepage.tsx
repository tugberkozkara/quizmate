import { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { socket } from "../socket";
import { Alert } from "../components/alerts/Alert";
import { JoinRoom } from "../components/homepage/JoinRoom";
import { CreateRoom } from "../components/homepage/CreateRoom";

export default function Homepage({ selfUsername }: { selfUsername: string }) {

  const [roomFullAlert, setRoomFullAlert] = useState(false);
  const [roomNotFoundAlert, setRoomNotFoundAlert] = useState(false);
  const navigate = useNavigate();

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
    })

    socket.on('room-not-found', () => {
      setRoomNotFoundAlert(true);
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

      <JoinRoom />
      <p className='m-4'>or</p>
      <CreateRoom />
    </section>
  )
}

