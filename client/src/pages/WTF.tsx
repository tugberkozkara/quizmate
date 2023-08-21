import { NavLink } from "react-router-dom"

export default function WTF() {
  return (
    <section className="text-center col col-xl-3 col-lg-6 col-md-8 col-sm-9 col-9 mx-auto">
      <p className="mb-5 text-muted">
        <NavLink className="nav-item nav-link mx-2" to="/"><span className="btn btn-outline-secondary">Play now!</span></NavLink>
      </p>
        <h1 className="h3 mb-3">What?</h1>
        <div className="text-start">
            <h4>quiz</h4>
            <span>[kwɪz] </span><b>·</b><i> noun</i>
            <br />
            <p>a game or competition in which you answer questions</p>
            <h4>mate</h4>
            <span>[meɪt] </span><b>·</b><i> noun</i>
            <br />
            <p>a friend</p>
        </div>
        <br />
        <p className="text-start text-muted">
            <b>QuizMate! is a simple game of trivia.</b>
        </p>
        <p className="text-start text-muted">
            You can create a room and invite your mates to play with you. Every room member selects a category they're good at and <b>AI</b> will generate questions based on those categories. The faster you answer, the more points you get.
        </p>
        <p className="text-start text-muted">
          <b>How to play?</b>
          <br />
          <b>1.</b> Create a room and invite your mate/s with the room code.
          <br />
          <b>2.</b> Enter a category that you're good at.
          <br />
          <b>3.</b> Wait for the questions to generate by AI.
          <br />
          <b>4.</b> When the game starts, answer the questions as fast as you can.
          <br />
          <b>5.</b> Have fun!
        </p>
        <p className="text-start text-muted">
          <b>QuizMate!</b> is open sourced on <a target="_blank" rel="noreferrer" className="text-decoration-none" href="https://github.com/tugberkozkara/quizmate">GitHub</a>.
        </p>
    </section>
  )
}