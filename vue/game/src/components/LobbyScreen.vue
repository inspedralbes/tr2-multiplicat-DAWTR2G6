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
      mode: null, // singlePlayer / multiPlayer
      playersCount: 0,
      socket: null,
      players: [],
    };
  },
  methods: {
    startSinglePlayerMode() {
      // PONER EL MODO DE JUEGO EN 1 JUG
      this.mode = 'singlePlayer';
      // INICIAR SOCKET
      this.initSocket(() => {
        // FUNCION DE INICIO DE JUEGO DE 1 JUG
        this.socket.emit('begin-SP-gameMode');
      });
    },
    startMultiPlayerMode() {
       // PONER EL MODO DE JUEGO EN +1 JUG
      this.mode = 'multiPlayer';
       // INICIAR SOCKET
      this.initSocket(() => {
        // FUNCION DE INICIO DE JUEGO DE +1 JUG
        this.socket.emit('check-if-mult-isPlayable');
      });
    },
    // ____________________________________________________FUNCION CALLBACK
    initSocket(callback) {
      if (this.socket && this.socket.connected) {
        console.log('Socket already connected');
        if (typeof callback === 'function') {
          callback();
        }
        return;
      }
    // ____________________________________________________FUNCION CALLBACK

      // PONER LA URL EN EL SOCKET
      this.socket = io('http://localhost:3333', {
        withCredentials: true, 
      });


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
