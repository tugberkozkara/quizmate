import { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
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
        <Route path="/lobby" element={<RequireAuth selfUsername={selfUsername}><Lobby selfUsername={ selfUsername }/></RequireAuth>} />
        <Route path="/rooms/:roomId" element={<RequireAuth selfUsername={selfUsername}><Room selfUsername={ selfUsername }/></RequireAuth>} />
        <Route path="/rooms/:roomId/games/:gameId" element={<RequireAuth selfUsername={selfUsername}><Game selfUsername={ selfUsername }/></RequireAuth>} />
        <Route path="/rooms/:roomId/games/:gameId/result" element={<RequireAuth selfUsername={selfUsername}><Result selfUsername={ selfUsername }/></RequireAuth>} />
        <Route path="/wtf" element={<WTF />} />
      </Routes>
    </div>
  );
}

export default App;
