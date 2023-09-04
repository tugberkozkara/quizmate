import { NavLink, useNavigate } from 'react-router-dom';
import { socket } from '../socket';
import { Header } from "../components/Header";

type HomeProps = {
    selfUsername: string;
    setSelfUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function Home({selfUsername, setSelfUsername}: HomeProps) {
    
    const navigate = useNavigate();

    const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelfUsername(e.target.value);
    }

    const connectWithUsername = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.auth = { username: selfUsername };
        socket.connect();
        navigate('/lobby');
    }

  return (
        <>
        <Header />
        <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
            <p className="mb-5 text-muted">
                <NavLink className="mx-2" to="/wtf"><span className="btn btn-outline-secondary">What is that?</span></NavLink>
            </p>
            <form onSubmit={connectWithUsername}>
                <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter username" name="socket-username" value={selfUsername} onChange={usernameHandler} required></input>
                </div>
                <p className='mb-0'>
                <button className="btn btn-outline-primary my-2" type='submit'>Get In</button>
                </p>
            </form>
        </section>
        </>
  )
}
