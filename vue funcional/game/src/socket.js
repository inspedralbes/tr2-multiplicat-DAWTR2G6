// socket.js
/*import io from 'socket.io-client';

const socket = io('http://localhost:3333', {
  withCredentials: true,
});

export default socket;
*/



// Import the Socket.io client library
import io from 'socket.io-client';

// Connect to the Socket.io server
export const socket = io('http://localhost:3333'); // Replace with your server URL

// Example: Listen for the 'updatePlayers' event
socket.on('updatePlayers', (players) => {
  console.log('Llista de jugadors:', players);
  // Handle the updated player list in your Vue component
});

