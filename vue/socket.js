import { io } from "socket.io-client";
import { useAppStore } from '@/stores/app';

// Use the correct URL for your socket server
const URL = `http://sockets.daw.inspedralbes.cat/Servidor:3555`;

// Configure socket connection with the appropriate options
export const socket = io(URL, {
  transports: ['websocket'], // Use only WebSocket transport
});

// Listen for the "actualizacionVotos" event and update the Vuex store
socket.on("actualizacionVotos", (newVotos) => {
  const store = useAppStore();
  store.setVotos(newVotos);
});
