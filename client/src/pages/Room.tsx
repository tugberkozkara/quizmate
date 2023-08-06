import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from "../socket";

export default function Room() {
    const params = useParams();
    const roomId = params.roomId;
    
    const [category, setCategory] = useState('');
    const navigate = useNavigate();


    // Start game with a category
    const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    }

    const startGameHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit('start-game', roomId, category);
        console.log('start game '+ roomId + ' ' + category);        
    }

    // Leave the room
    const leaveRoomHandler = () => {
        socket.emit('leave-room', roomId);
    }

    useEffect(() => {
        socket.on('room-left', () => {
            console.log('room left');
            navigate(`/`);
        })
        
        socket.on('waiting-for-players', () => {
            console.log('waiting for players');
        })

        socket.on('game-started', (room: any) => {
            console.log('game started in room '+room.id);
        })

    }, []);
    

  return (
    <>
        <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
            <div>Room {roomId}</div>
            
            <form onSubmit={startGameHandler}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter a category" name="category" value={category} onChange={categoryHandler}></input>
                </div>
                <p className='mb-0'>
                    <button className="btn btn-outline-primary my-2" type='submit'>Add category</button>
                </p>
            </form>
            <p className='mb-0'>or</p>
            <p className='mb-0'>
                <button className="btn btn-outline-primary my-2" onClick={leaveRoomHandler}>Leave the room</button>
            </p>
        </section>
    </>
  )
}