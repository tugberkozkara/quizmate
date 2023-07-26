import { useEffect } from 'react';
import { socket } from './socket';
import { getRandomUsername } from './utils/randomUsername';


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
    <div className="app">
    </div>
  );
}

export default App;
