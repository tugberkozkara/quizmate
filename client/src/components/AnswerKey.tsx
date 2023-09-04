import { socket } from "../socket";

export const AnswerKey = (game: any) => {

    const selfPlayerResult = game.game.playerResults.filter((e: any) => e.player.id === socket.id)[0];

  return (
    <>
    <nav className="navbar navbar-light bg-light d-flex row col-sm-10 mx-auto mb-3 px-1">
        <span className="navbar-brand w-auto text-muted">Answer Key</span>
        <button className="navbar-toggler w-auto mx-2 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#answerKeyToggler" aria-controls="answerKeyToggler" aria-expanded="false">
            <span className="bi-filter fs-2"></span>
        </button>

        <div className="collapse navbar-collapse" id="answerKeyToggler">
            <div className="navbar-nav">
                <div className="container mt-3 nav-item navbar-nav-scroll" id="answer-key">
                    <div className="row">
                        <div className="col-6 fw-bold">Questions</div>
                        <div className="col-3 fw-bold">Correct Answers</div>
                        <div className="col-3 fw-bold">Your Answers</div>
                    </div>
                    {game.game.questions.map((question: any, i: any) => {
                        return (
                            <div className="row" key={i}>
                                <div className="col-6"><span className="fw-bold">{question.id}. </span>{question.question}</div>
                                <div className="col-3">{question.answer}</div>
                                <div className="col-3">
                                    {selfPlayerResult?.answers.filter((e: any) => e.question.id === question.id)[0]?.correct ?
                                    <span className="text-success">{selfPlayerResult?.answers.filter((e: any) => e.question.id === question.id)[0]?.answer}</span>
                                    :
                                    <span className="text-danger">{selfPlayerResult?.answers.filter((e: any) => e.question.id === question.id)[0]?.answer}</span>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </nav>
    </>
  )
}
