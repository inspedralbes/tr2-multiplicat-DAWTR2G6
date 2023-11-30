<!-- LobbyScreen.vue -->
<template>
  <div class="container">
    <h2 class="mt-5">Sala de Lobby</h2>
    <div>
      <p>Selecciona el modo de juego:</p>
      <button @click="startSinglePlayerMode">Un solo jugador</button>
      <button @click="startMultiPlayerMode">4 jugadores</button>
    </div>
    <div v-if="mode === 'multiPlayer'">
      <p>{{ playersCount }} jugadores en la sala</p>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'LobbyScreen',
  data() {
    return {
      mode: null, // 'singlePlayer' o 'multiPlayer'
      playersCount: 0,
      socket: null,
      players: [],
    };
  },
  methods: {
    startSinglePlayerMode() {
      this.mode = 'singlePlayer';
      this.initSocket(() => {
        this.socket.emit('begin-SP-gameMode');
      });
    },
    startMultiPlayerMode() {
      this.mode = 'multiPlayer';
      this.initSocket(() => {
        this.socket.emit('check-if-mult-isPlayable');
      });
    },
    initSocket(callback) {
      if (this.socket && this.socket.connected) {
        console.log('Socket already connected');
        if (typeof callback === 'function') {
          callback();
        }
        return;
      }

      // Connect to the server with the origin of your Vue.js application
      this.socket = io('http://localhost:3333', {
        withCredentials: true, // Add this line to include credentials
      });

      // Rest of your existing code...

      if (typeof callback === 'function') {
        callback();
      }
    },
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style scoped>
/* Your existing styles... */
</style>
