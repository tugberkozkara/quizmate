import { useNavigate, useLocation } from 'react-router-dom';
import { socket } from "../socket";

export default function Result({ selfUsername }: { selfUsername: string }) {
    const {state} = useLocation();
    const gameScore = state.gameScore;
    const room = state.room;
    const navigate = useNavigate();
    
    
    let highestScore: number[] = gameScore[0].score;
    let winners: string[] = [gameScore[0].player.username];
    for(let i = 1; i < gameScore.length; i++) {
        if(gameScore[i].score > highestScore) {
            highestScore = gameScore[i].score;
            winners = [gameScore[i].player.username];
        }
        else if(gameScore[i].score === highestScore) {
            winners.push(gameScore[i].player.username);
        }

    }

    const leaveRoom = () => {
        socket.emit('leave-room', room.id);
        navigate(`/`);
    }

  return (
    <>
        <section className="text-center col col-lg-6 col-md-6 col-sm-10 col-10 mx-auto">
            <div>Game Result</div>

            <div className="container mb-0 mt-5">
                {winners.length > 1 && winners.includes(selfUsername) ?
                    <div className="alert alert-warning" role="alert">
                        <h4 className="alert-heading">It's a tie!</h4>
                        <p>The winners are {winners.join(', ')}!</p>
                    </div>
                    :
                    winners[0] === selfUsername ?
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Congratulations!</h4>
                        <p>You are the winner!</p>
                    </div>
                    :
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Maybe next time!</h4>
                        <p>The winner is {winners[0]}!</p>
                    </div>
                }
            </div>

            <div className="container mb-0 mt-5">
                {gameScore.map((result: any, i: any) => {
                    return (
                        <div key={i} className="row">
                            <div className="col">{result.player.username}</div>
                            <div className="col">{result.score}</div>
                        </div>
                    )
                })
                }
            </div>

            <p className='mb-0 mt-3'>
                <button className="btn btn-outline-danger my-3" onClick={leaveRoom}>Back to Homepage</button>
            </p>

        </section>
    </>
  )
}
