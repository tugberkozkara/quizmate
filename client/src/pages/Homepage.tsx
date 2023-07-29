import { socket } from "../socket";


export default function Homepage() {

  const createRoomHandler = () => {
      socket.emit('create-room', socket.id);
  }

  return (
    <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
    <form>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Enter room key" name="room-key"></input>
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

