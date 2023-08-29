import { useNavigate, useLocation } from 'react-router-dom';
import { socket } from "../socket";
import { AnswerKey } from '../components/AnswerKey';

export default function Result({ selfUsername }: { selfUsername: string }) {
    const {state} = useLocation();
    const {room, game} = state;
    const playerResults = game.playerResults;
    console.log(playerResults);
    const navigate = useNavigate();

    type player = {
        id: string,
        username: string
    }

    let highestScore: number = playerResults[0].score;
    let highestTimeLeft: number = playerResults[0].timeLeft;
    let winners: player[] = [playerResults[0].player];
    for (let i = 1; i < playerResults.length; i++) {
        if (playerResults[i].score > highestScore || (playerResults[i].score === highestScore && playerResults[i].timeLeft > highestTimeLeft)) {
            highestScore = playerResults[i].score;
            highestTimeLeft = playerResults[i].timeLeft;
            winners = [playerResults[i].player];
        }
        else if (playerResults[i].score === highestScore && playerResults[i].timeLeft === highestTimeLeft) {
            winners.push(playerResults[i].player);
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
                    {winners.length > 1
                        &&
                        winners.filter(e => e.id === socket.id).length > 0
                        &&
                        winners.filter(e => e.id === socket.id)[0].id === socket.id ?
                        <div className="alert alert-warning" role="alert">
                            <h4 className="alert-heading">It's a tie!</h4>
                            <p>A tight race between {winners.map(e => e.username).join(', ')}!</p>
                        </div>
                        :
                        winners[0].id === socket.id ?
                            <div className="alert alert-success" role="alert">
                                <h4 className="alert-heading">Congratulations!</h4>
                                <p>You are the winner!</p>
                            </div>
                            :
                            <div className="alert alert-danger" role="alert">
                                <h4 className="alert-heading">Maybe next time!</h4>
                                <p>The winner is {winners[0].username}!</p>
                            </div>
                    }
                </div>

                <div className="container mb-0 mt-5">
                    <div className="row">
                        <div className="col-6 fw-bold">Player</div>
                        <div className="col-3 fw-bold">Score</div>
                        <div className="col-3 fw-bold">Time Left</div>
                    </div>
                    {playerResults.map((result: any, i: any) => {
                        return (
                            <div key={i} className="row">
                                <div className="col-6">{result.player.username}</div>
                                <div className="col-3">{result.score}</div>
                                <div className="col-3">{result.timeLeft}</div>
                            </div>
                        )
                    })
                    }
                </div>

                <div className="container mb-0 mt-5">
                    <AnswerKey game={game} />
                </div>

                <div className="container mb-0 mt-5">
                    <button className="btn btn-outline-primary my-3">New Game</button>
                </div>

                <p className='mb-0 mt-3'>
                    <button className="btn btn-outline-danger my-3" onClick={leaveRoom}>Back to Homepage</button>
                </p>

            </section>
        </>
    )
}
