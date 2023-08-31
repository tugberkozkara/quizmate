import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { Alert } from "../components/alerts/Alert";
import { socket } from "../socket";

export default function Game({ selfUsername }: { selfUsername: string }) {

    type question = {
        id: number,
        category: string,
        question: string,
        answer: string
    }

    const {state} = useLocation();
    const {room, game} = state;
    const questions: question[] = game.questions;
    const [selfAnswers, setSelfAnswers] = useState([]) as any;
    const [waitingForPlayersAlert, setWaitingForPlayersAlert] = useState(false);
    const [roomLeftUser, setRoomLeftUser] = useState('');
    const [timeLeft, setTimeLeft] = useState(game.questions.length * 10);
    const navigate = useNavigate();

    const finishGame = useCallback((selfAnswers: []) => {
        socket.emit('finish-game', room.id, game.id, selfAnswers, timeLeft);
    }, [room.id, game.id, timeLeft]);

    const leaveRoom = () => {
        socket.emit('leave-room', room.id);
        navigate(`/`);
    }

    useEffect(() => {
        socket.on('room-left', (room: any, player: any) => {
            setRoomLeftUser(player.username);
        })

        socket.on('waiting-for-players', (room: any) => {
            setWaitingForPlayersAlert(true);
        })

        socket.on('game-finished', (room: any, game: any) => {
            navigate(`/result/${game.id}`, { state: { room: room, game: game }});
        })
    }, [navigate])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
            if (timeLeft === 0) {
                finishGame(selfAnswers);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, finishGame, selfAnswers]);


    return (
        <>
            <section className="text-center col col-lg-6 col-md-6 col-sm-10 col-10 mx-auto">
                <div>Game {game.id}</div>
                <div>Time left: {timeLeft}</div>

                {waitingForPlayersAlert &&
                    <Alert type="warning" heading="Waiting for players" text="Waiting for other players to finish the game..." mutedText="" hasSpinner={false} />
                }

                {roomLeftUser &&
                    <Alert type="warning" heading="Room left" text={`${roomLeftUser} left the room`} mutedText="" hasSpinner={false} />
                }

                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        {questions.map((question: question, i: any) => {
                            let nextQuestion = questions[question.id]
                            return (
                                question.id === 1 ?
                                    <div className="carousel-item active" key={i}>
                                        <QuestionCard question={question} nextQuestion={nextQuestion} selfAnswers={selfAnswers} finishGame={finishGame} />
                                    </div>
                                    :
                                    <div className="carousel-item" key={i}>
                                        <QuestionCard question={question} nextQuestion={nextQuestion} selfAnswers={selfAnswers} finishGame={finishGame} />
                                    </div>
                            )
                        })}
                    </div>
                </div>

                <p className='mb-0'>
                    <button className="btn btn-outline-danger my-3" onClick={leaveRoom}>Leave Game</button>
                </p>

            </section>
        </>
    )
}
