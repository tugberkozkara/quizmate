import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { socket } from "../socket";

export default function Room({ selfUsername }: { selfUsername: string }) {
    const params = useParams();
    const roomId = params.roomId;

    const {state} = useLocation();
    const [roomPlayers, setRoomPlayers] = useState(state.room.players || []);
    const [roomCategories, setRoomCategories] = useState(state.room.categories || []);
    const [category, setCategory] = useState('');
    const navigate = useNavigate();


    // Start game with a category
    const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    }

    const addCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRoomCategories([...roomCategories, category]);
        socket.emit('add-category', roomId, category);
        document.getElementById('start-game-button')?.classList.remove('disabled');
        document.getElementById('add-category-button')?.classList.add('disabled');
    }

    const startGame = () => {
        socket.emit('start-game', roomId);
    }

    // Leave the room
    const leaveRoom = () => {
        socket.emit('leave-room', roomId);
        navigate(`/`);
    }

    useEffect(() => {
        socket.on('room-left', (room: any, player: any) => {
            setRoomPlayers(room.players);
            setRoomCategories(room.categories);
            console.log(player.username +' left the room');
        })

        socket.on('room-joined', (room: any) => {
            setRoomPlayers(room.players);
            setRoomCategories(room.categories);
            console.log('room joined');
        })

        socket.on('category-added', (room: any) => {
            setRoomPlayers(room.players);
            setRoomCategories(room.categories);
            console.log('category added');
        })
        
        socket.on('waiting-for-players', (room: any) => {
            setRoomPlayers(room.players);
            setRoomCategories(room.categories);
            console.log('waiting for players in room ' + room.id);
        })

        socket.on('game-started', (room: any, game: any) => {
            setRoomPlayers(room.players);
            setRoomCategories(room.categories);
            console.log('game started in room '+ room.id);
            navigate(`/game/${game.id}`, { state: { room: room, game: game }});
        })

    }, [navigate]);
    

  return (
    <>
        <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
            <div>Room {roomId}</div>
            
            <form onSubmit={addCategory}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter a category" name="category" value={category} onChange={categoryHandler}></input>
                </div>
                <p className='mb-0'>
                    <button id="add-category-button" className="btn btn-outline-dark my-2" type='submit'>Add category</button>
                </p>
            </form>

            <p className='mb-0'>
                <button id="start-game-button" className="btn btn-primary my-2 disabled" onClick={startGame}>Start Game</button>
            </p>

            <p className='mb-0'>or</p>
            <p className='mb-0'>
                <button className="btn btn-outline-danger my-2" onClick={leaveRoom}>Leave Room</button>
            </p>

            <div className="container mb-0 mt-5">
                <div className="row">
                    <div className="col">
                    <p className='mb-0 mt-5'>players: </p>
                        {roomPlayers.map((player: any, i: any) => (
                            player.username === selfUsername ?
                            <p className='mb-0 text-primary' key={i}>{player.username}</p>
                            :
                            <p className='mb-0' key={i}>{player.username}</p>
                        ))}
                    </div>
                    <div className="col">
                    <p className='mb-0 mt-5'>categories: </p>
                        {roomCategories.map((cat: string, i: any) => (
                            <p className='mb-0' key={i}>{cat}</p>
                        ))}
                    </div>
                </div>
            </div>
        
        </section>
    </>
  )
}
