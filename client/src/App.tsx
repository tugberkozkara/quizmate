import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';

import { socket } from './socket';
import { getRandomUsername } from './utils/randomUsername';

import NavBar from './components/NavBar';
import Homepage from './pages/Homepage';


function App() {
  
  useEffect(() => {
    socket.auth = { username: getRandomUsername() };
    socket.connect();
    socket.on('connect', () => {
      console.log(socket.id + ' connected');
    });
    socket.on('disconnect', () => {
      console.log(socket.id + ' disconnected');
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
