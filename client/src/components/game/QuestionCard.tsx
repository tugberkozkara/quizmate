import { useState } from 'react';

type QuestionCardProps = {
    question: any,
    nextQuestion: any,
    selfAnswers: any,
    finishGame: (selfAnswers: []) => void
}

export const QuestionCard = ({ question, nextQuestion, selfAnswers, finishGame }: QuestionCardProps) => {

    const [answer, setAnswer] = useState('');

    const answerHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    }

    const collectAnswer = (e: any) => {
        e.preventDefault();
        selfAnswers.push({questionId: question['id'], answer: answer});
        if (!nextQuestion) {
            finishGame(selfAnswers);
            document.getElementById(`input-answer-${question['id']}`)?.setAttribute("disabled", "true");
            document.getElementById("finish-button")?.setAttribute("disabled", "true");
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
                        <input type="text" id={`input-answer-${question['id']}`} className="form-control" placeholder="Answer" name="answer" value={answer} onChange={answerHandle}></input>
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
