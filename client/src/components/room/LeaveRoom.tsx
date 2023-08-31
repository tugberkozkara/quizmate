import { socket } from "../../socket";

type LeaveRoomProps = {
    roomId: string,
    navigate: any
}

export const LeaveRoom = ({roomId, navigate}: LeaveRoomProps) => {

    const leaveRoom = () => {
        socket.emit('leave-room', roomId);
        navigate(`/`);
    }

  return (
    <>
        <p className='mb-0'>
            <button className="btn btn-outline-danger my-2" onClick={leaveRoom}>Leave Room</button>
        </p>
    </>
  )
}
