import { useState } from 'react';

export const QuestionCard = ({ question, nextQuestion, selfAnswers, setSelfAnswers, finishGame }: { question: any, nextQuestion: any, selfAnswers: any, setSelfAnswers: React.Dispatch<React.SetStateAction<any[]>>, finishGame: ()=>void } ) => {

    const [answer, setAnswer] = useState('');

    const answerHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    }

    const collectAnswer = (e: any) => {
        e.preventDefault();
        setSelfAnswers([...selfAnswers, {questionId: question['id'], answer: answer}]);
        if (e.target.id === 'finish-button') {
            finishGame();
        }
    }

  return (
    <>
        <div className="card text-center bg-light p-5">
            <div className="card-body">
                <h5 className="card-title">{question['id']}</h5>
                <h6 className="card-title text-muted">{question['category']}</h6>
                <h4 className="card-title">{question['question']}</h4>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Answer" name="answer" value={answer} onChange={answerHandle}></input>
                </div>
                {nextQuestion ?
                    <button type="button" id="next-button" className="btn btn-outline-primary" data-bs-target="#carouselExample" data-bs-slide="next" onClick={collectAnswer}>Next Question</button>
                    :
                    <button type="button" id="finish-button" className="btn btn-outline-primary" onClick={collectAnswer}>Finish</button>
                }
            </div>
        </div>
    </>
  )
}
