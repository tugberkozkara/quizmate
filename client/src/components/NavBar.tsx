import { NavLink } from 'react-router-dom'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <a className="navbar-brand" href="/">QuizMate!</a>
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
            <span className="bi-three-dots fs-2"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link active mx-2" to="/">Home</NavLink>
                    <NavLink className="nav-item nav-link active mx-2" to="/">Home</NavLink>
                    <NavLink className="nav-item nav-link active mx-2" to="/">Home</NavLink>
                </div>
            </div>
        </nav>
        <section className="py-5 text-center container">
            <div className="row">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-normal ">QuizMate!</h1>
                    <p className="lead text-muted">Find your mate and start quizzing!</p>
                </div>
            </div>
        </section>
    </div>
  )
}

export default NavBar