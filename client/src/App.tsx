import { useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Room from './pages/Room';
import Game from './pages/Game';
import Result from './pages/Result';
import WTF from './pages/WTF';


function App() {
  const [selfUsername, setSelfUsername] = useState('');
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home selfUsername={ selfUsername } setSelfUsername={setSelfUsername}/>} />
        <Route path="/lobby" element={<Lobby selfUsername={ selfUsername }/>} />
        <Route path="/rooms/:roomId" element={<Room selfUsername={ selfUsername }/>} />
        <Route path="/rooms/:roomId/games/:gameId" element={<Game selfUsername={ selfUsername }/>} />
        <Route path="/rooms/:roomId/games/:gameId/result" element={<Result selfUsername={ selfUsername }/>} />
        <Route path="/wtf" element={<WTF />} />
      </Routes>
    </div>
  );
}

export default App;
