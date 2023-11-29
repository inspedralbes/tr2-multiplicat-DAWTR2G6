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
    };
  },
  methods: {
    startSinglePlayerMode() {
      this.mode = 'singlePlayer';
      this.socket.emit('startPlayingSinglePlayer');
    },
    startMultiPlayerMode() {
      this.mode = 'multiPlayer';
      this.initSocket();
    },
    initSocket() {
      // Inicializar el socket para el modo multijugador
      this.socket = io('http://localhost:3333'); // Ajusta la URL del servidor de sockets
      this.socket.on('playerJoined', (count) => {
        // Actualizar el contador de jugadores cuando un jugador se une
        this.playersCount = count;
      });
    },
  },
  beforeDestroy() {
    // Desconectar el socket al salir del componente
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style scoped>
/* No se necesitan estilos específicos aquí */
</style>
