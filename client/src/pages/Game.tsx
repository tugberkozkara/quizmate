import { useLocation } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';

export default function Game() {

    type question = {
        id: number,
        category: string,
        question: string,
        answer: string
    }
    
    const {state} = useLocation();
    const roomId = state.room.id;
    const game = state.game;
    const questions: question[] = game.questions;

  return (
    <>
        <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
            <div>Game {roomId}</div>

            <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
                    {questions.map((question: question) => {
                        return (
                            <div className="carousel-item active">
                                <QuestionCard question={question}  />
                            </div>
                        )
                    })}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
            

        </section>
    </>
  )
}
