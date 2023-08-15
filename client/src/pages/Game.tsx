import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { socket } from "../socket";

export default function Game() {

    type question = {
        id: number,
        category: string,
        question: string,
        answer: string
    }

    type selfAnswer = {
        questionId: number,
        answer: string
    }
    
    const {state} = useLocation();
    const room = state.room;
    const game = state.game;
    const questions: question[] = game.questions;
    const selfAnswers: selfAnswer[] = [];
    const navigate = useNavigate();
    
    const finishGame = () => {
        console.log('finish game');
        socket.emit('finish-game', room.id, game.id, selfAnswers);
    }

    const leaveRoom = () => {
        socket.emit('leave-room', room.id);
        navigate(`/`);
    }

    useEffect(() => {
        socket.on('waiting-for-players', (room: any) => {
            console.log('waiting for players in room ' + room.id);
        })

        socket.on('game-finished', (room: any, gameScore: any) => {
            console.log('game finished');
            console.log(gameScore);
        })
    }, [])
    

  return (
    <>
        <section className="text-center col col-lg-6 col-md-6 col-sm-10 col-10 mx-auto">
            <div>Game {game.id}</div>

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
