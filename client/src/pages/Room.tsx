import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { socket } from "../socket";
import { NavBar } from '../components/NavBar';
import { Alert } from "../components/alerts/Alert";
import { AddCategory } from '../components/room/AddCategory';
import { StartGame } from '../components/room/StartGame';
import { LeaveRoom } from '../components/room/LeaveRoom';
import { RoomEntityList } from '../components/room/RoomEntities';


export default function Room({ selfUsername }: { selfUsername: string }) {
    const {state} = useLocation();
    const room = state.room;

    const [roomPlayers, setRoomPlayers] = useState(room.players || []);
    const [roomCategories, setRoomCategories] = useState(room.categories || []);
    const [waitingForPlayersAlert, setWaitingForPlayersAlert] = useState(false);
    const [waitingForQuestionsAlert, setWaitingForQuestionsAlert] = useState(false);
    const [roomLeftUser, setRoomLeftUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('room-left', (room: any, player: any) => {
            setRoomPlayers(room.players);
            setRoomCategories(room.categories);
            setRoomLeftUser(player.username);
        })

        socket.on('room-joined', (room: any) => {
            setRoomPlayers(room.players);
            setRoomCategories(room.categories);
            setRoomLeftUser('');
        })

        socket.on('category-added', (room: any) => {
            setRoomPlayers(room.players);
            setRoomCategories(room.categories);
        })
        
        socket.on('waiting-for-players', (room: any) => {
            setWaitingForPlayersAlert(true);
        })

        socket.on('waiting-for-questions', (room: any) => {
            document.getElementById('start-game-button')?.classList.add('disabled');
            setWaitingForQuestionsAlert(true);
            setWaitingForPlayersAlert(false);
        })

        socket.on('game-started', (room: any, game: any) => {
            setWaitingForPlayersAlert(false);
            setWaitingForQuestionsAlert(false);
            navigate(`/game/${game.id}`, { state: { room: room, game: game }});
        })

    }, [navigate, roomLeftUser, waitingForPlayersAlert]);
    

  return (
    <>  
        <NavBar />
        <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
            <div>Room {room.id}</div>

            {waitingForPlayersAlert &&
                <Alert type="warning" heading="Waiting for Players" text="Waiting for other players to be ready..." mutedText="" hasSpinner={false} />
            }

            {roomLeftUser &&
                <Alert type="warning" heading="Room left" text={`${roomLeftUser} left the room`} mutedText="" hasSpinner={false} />
            }

            {waitingForQuestionsAlert ?(
                <Alert type="warning" heading="Waiting for Questions" text="AI generated questions will be here!" mutedText="This process may take up to a minute." hasSpinner={true} />
            ):
            (
                <>
                    <AddCategory roomId={room.id} roomCategories={roomCategories} setRoomCategories={setRoomCategories}/>
                    <StartGame roomId={room.id} />
                    <p className='mb-0'>or</p>
                    <LeaveRoom roomId={room.id} navigate={navigate} />

                    <div className="container mb-0 mt-5">
                        <div className="row">
                            <div className="col">
                                <RoomEntityList heading="Players" entityList={roomPlayers} entityKey="username" selfUsername={selfUsername}/>
                            </div>
                            <div className="col">
                                <RoomEntityList heading="Categories" entityList={roomCategories} entityKey="" selfUsername={selfUsername}/>
                            </div>
                        </div>
                    </div>
                </>)}
        </section>
    </>
  )
}
