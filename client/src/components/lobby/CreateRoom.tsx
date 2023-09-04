import { useState } from 'react';
import { socket } from '../../socket';

export const CreateRoom = () => {
    const [capacity, setCapacity] = useState(2);
    
    const capacityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCapacity(parseInt(e.target.value));
    }
    
    const createRoom = () => {
        socket.emit('create-room', capacity);
    }
  return (
    <>  
        <div className="text-center align-self-center">
            <div className="input-group mb-3">
                <label className="form-label text-muted">How many players? {capacity}</label>
                <input type="range"  className="form-range" min="2" max="10" defaultValue={capacity} onChange={capacityHandler} name="price" required></input>
            </div>
            <p className='mb-0'>
            <button className="btn btn-outline-primary my-2" onClick={createRoom}>Create a room</button>
            </p>
        </div>
    </>
  )
}
