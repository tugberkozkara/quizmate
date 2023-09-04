import { NavLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 mb-5">
            <a className="navbar-brand" href="/">QuizMate!</a>
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
            <span className="bi-three-dots fs-2"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link active mx-2" to="/">Home</NavLink>
                    <NavLink className="nav-item nav-link mx-2" to="/wtf">What?</NavLink>
                </div>
            </div>
        </nav>
    </div>
  )
}
