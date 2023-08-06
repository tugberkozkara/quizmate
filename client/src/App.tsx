import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';

import { socket } from './socket';
import { getRandomUsername } from './utils/randomUsername';

import NavBar from './components/NavBar';
import Homepage from './pages/Homepage';
import Room from './pages/Room';


function App() {
  
  useEffect(() => {
    socket.auth = { username: getRandomUsername() };
    socket.connect();
    
    return () => {
      socket.disconnect();
    };
  }, []);
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
