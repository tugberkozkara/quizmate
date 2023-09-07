import { useNavigate, useLocation } from 'react-router-dom';
import { socket } from "../socket";
import { NavBar } from '../components/NavBar';
import { Alert } from '../components/alerts/Alert';
import { AnswerKey } from '../components/result/AnswerKey';
import { LeaveRoom } from '../components/room/LeaveRoom';
import { GameResult } from '../components/result/GameResult';
import { RoomResult } from '../components/result/RoomResult';

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

    const backToRoom = () => {
        navigate(`/room/${room.id}`, { state: { room: room }});
    }

    return (
        <>
            <NavBar />
            <section className="text-center col col-lg-6 col-md-6 col-sm-10 col-10 mx-auto">
            <div className="h3 mb-5 fw-light">Game Result</div>

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

                <div className="row">
                    <div className="col-12 col-md-6">
                        <GameResult game={game} />
                    </div>
                    <div className="col-12 col-md-6">
                        <RoomResult room={room} />
                    </div>
                </div>

                <div className="container mb-0 mt-5">
                    <AnswerKey game={game} />
                </div>

                <div className="container mb-0 mt-5">
                    <button className="btn btn-outline-primary my-3" onClick={backToRoom}>New Game</button>
                </div>

                <LeaveRoom roomId={room.id} navigate={navigate} />

            </section>
        </>
    )
}
