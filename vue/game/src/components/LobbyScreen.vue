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
import { socket } from "../socket.js";

export default {
  name: "LobbyScreen",
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
      this.mode = "singlePlayer";
    },
    startMultiPlayerMode() {
      // PONER EL MODO DE JUEGO EN +1 JUG
      this.mode = "multiPlayer";

      socket.emit("check-mult-jugable");
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
