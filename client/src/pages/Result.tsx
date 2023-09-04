import { useNavigate, useLocation } from 'react-router-dom';
import { socket } from "../socket";
import { NavBar } from '../components/NavBar';
import { Alert } from '../components/alerts/Alert';
import { AnswerKey } from '../components/AnswerKey';

export default function Result({ selfUsername }: { selfUsername: string }) {
    const {state} = useLocation();
    const {room, game} = state;
    const playerResults = game.playerResults;
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
            <NavBar />
            <section className="text-center col col-lg-6 col-md-6 col-sm-10 col-10 mx-auto">
                <div>Game Result</div>

                {winners.length > 1
                    &&
                    winners.filter(e => e.id === socket.id).length > 0
                    &&
                    winners.filter(e => e.id === socket.id)[0].id === socket.id ?
                        <Alert type="warning" heading="It's a tie!" text={`A tight race between ${winners.map(e => e.username).join(', ')}!`} mutedText="" hasSpinner={false}/>
                        :
                        winners[0].id === socket.id ?
                            <Alert type="success" heading="Congratulations!" text="You are the winner!" mutedText="" hasSpinner={false}/>
                            :
                            <Alert type="danger" heading="Maybe next time!" text={`The winner is ${winners[0].username}!`} mutedText="" hasSpinner={false}/>
                }

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
