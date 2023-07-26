import { useEffect } from 'react';
import { socket } from './socket';


function App() {
  
  useEffect(() => {
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
