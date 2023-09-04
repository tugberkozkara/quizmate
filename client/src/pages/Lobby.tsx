import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { socket } from "../socket";
import { Alert } from "../components/alerts/Alert";
import { JoinRoom } from "../components/lobby/JoinRoom";
import { CreateRoom } from "../components/lobby/CreateRoom";
import { Header } from "../components/Header";

export default function Lobby({ selfUsername }: { selfUsername: string }) {

  const [roomFullAlert, setRoomFullAlert] = useState(false);
  const [roomNotFoundAlert, setRoomNotFoundAlert] = useState(false);
  const navigate = useNavigate();

  const backToHome = () => {
    socket.disconnect();
    navigate('/');
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
    })

    socket.on('room-not-found', () => {
      setRoomNotFoundAlert(true);
    })

  }, [navigate]);


  return (
    <>
      <Header />
      <section className="text-center col col-xl-6 col-lg-8 col-md-7 col-sm-8 col-9 mx-auto">
        <div className="h3 mb-5 fw-light">Welcome <span className="fw-bold font-monospace">{selfUsername}</span></div>

        {roomFullAlert &&
          <Alert type="warning" heading="Room is full" text="They don't want you..." hasSpinner={false} mutedText=""/>
        }
        {roomNotFoundAlert &&
          <Alert type="warning" heading="Room not found" text="Room with that id doesn't exist..." hasSpinner={false} mutedText=""/>
        }

        <div className="row justify-content-center text-center mb-3">
            <div className="col-12 col-lg-5">
              <div className="card p-5 h-100">
                <JoinRoom />
              </div>
            </div>
            <div className="col-12 col-lg-1 text-center align-self-center my-3">
              <span className="fw-bold">OR</span>
            </div>
            <div className="col-12 col-lg-5">
              <div className="card p-5 h-100">
                <CreateRoom />
              </div>
            </div>
        </div>
        <div className="justify-content-center text-center">
          <button className="btn btn-outline-danger" onClick={backToHome}>Back to Home</button>
        </div>
      </section>
    </>
  )
}

