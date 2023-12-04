<template>
  <div class="lobby-container">
    <h2 class="lobby-title mt-5">Sala de Lobby</h2>
    <div class="lobby-options">
      <p>Selecciona el modo de juego:</p>
      <button @click="startSinglePlayerMode" class="btn btn-primary">Un solo jugador</button>
      <button @click="startMultiPlayerMode" class="btn btn-success">4 jugadores</button>
    </div>
    <div v-if="mode === 'multiPlayer'" class="player-info">
      <p>{{ contador_jugadors }} jugadores en la sala</p>

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
      contador_jugadors: 0,
      socket: null,
      players: [],

    };
  },
  methods: {
    startSinglePlayerMode() {
      // PONER EL MODO DE JUEGO EN 1 JUG
      this.mode = "singlePlayer";
      this.$router.push('/GameScreen');
    },
    startMultiPlayerMode() {
      // PONER EL MODO DE JUEGO EN +1 JUG
      this.mode = "multiPlayer";
      this.updatear_players();
      socket.emit("check-mult-jugable");
    },
    updatear_contador_jugadors(contador) {
      this.contador_jugadors = contador;
    },
    updatear_players() {
      socket.on("update_llista_jugadors", (players) => {
        this.contador_jugadors = players;
      });

    },
  },
  beforeDestroy() {
    if (socket) {
      socket.disconnect();
    }

  },
};

</script>

<style scoped>
.lobby-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.lobby-title {
  font-family: 'Arial', sans-serif;
}

.lobby-options {
  margin-top: 20px;
}

.btn {
  padding: 10px;
  margin: 5px;
  font-family: 'Arial', sans-serif;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
  transform: scale(1.1);
}

.btn-primary {
  background-color: #3498db;
  color: #fff;
}

.btn-success {
  background-color: #2ecc71;
  color: #fff;
}

.player-info {
  margin-top: 20px;
}
</style>
