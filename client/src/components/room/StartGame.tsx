import { socket } from "../../socket";

type StartGameProps = {
    roomId: string,
}

export const StartGame = ({ roomId }: StartGameProps) => {

    const startGame = () => {
        socket.emit('start-game', roomId);
    }

  return (
    <>
        <p className='mb-0'>
            <button id="start-game-button" className="btn btn-primary my-2 disabled" onClick={startGame}>Start Game</button>
        </p>
    </>
  )
}
