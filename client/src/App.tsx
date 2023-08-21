import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';

import { socket } from './socket';
import { getRandomUsername } from './utils/randomUsername';

import NavBar from './components/NavBar';
import Homepage from './pages/Homepage';
import Room from './pages/Room';
import Game from './pages/Game';
import Result from './pages/Result';
import WTF from './pages/WTF';


function App() {
  const [selfUsername, setSelfUsername] = useState('');

  useEffect(() => {
    socket.auth = { username: getRandomUsername() };
    socket.connect();
    
    setSelfUsername(socket.auth.username);

    return () => {
      socket.disconnect();
    };
  }, []);
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage selfUsername={ selfUsername }/>} />
        <Route path="/room/:roomId" element={<Room selfUsername={ selfUsername }/>} />
        <Route path="/game/:gameId" element={<Game selfUsername={ selfUsername }/>} />
        <Route path="/result/:gameId" element={<Result selfUsername={ selfUsername }/>} />
        <Route path="/wtf" element={<WTF />} />
      </Routes>
    </div>
  );
}

export default App;
