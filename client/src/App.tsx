import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';

import { socket } from './socket';
import { getRandomUsername } from './utils/randomUsername';

import NavBar from './components/NavBar';
import Homepage from './pages/Homepage';
import Room from './pages/Room';
import Game from './pages/Game';


function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.auth = { username: getRandomUsername() };
    socket.connect();
    
    setUsername(socket.auth.username);

    return () => {
      socket.disconnect();
    };
  }, []);
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage username={ username }/>} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/game/:roomId" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
