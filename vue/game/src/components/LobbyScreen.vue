<template>
  <body>
    <div class="lobby-container">
      <h2 class="lobby-title">Sala de Lobby</h2>
      <div class="lobby-options">
        <p>Selecciona el modo de juego:</p>
        <button @click="startSinglePlayerMode" class="btn">Vs Tu Mateix!</button>
        <button @click="startMultiPlayerMode" class="btn">Multijugador</button>
      </div>
      <div v-if="mode === 'multiPlayer'" class="player-info">
        <div v-if="contador_jugadors > 1">
          <p>{{ contador_jugadors }} jugadores en la sala</p>
        </div>
        <div v-if="contador_jugadors === 1">
          <p>{{ contador_jugadors }} jugador en la sala</p>
        </div>
      </div>
    </div>

  </body>
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
      roomId: 0,
      catergoria: null,
      multiplayerBtn_desabilitado: false,
    };
  },
  methods: {
    startSinglePlayerMode() {
      // PONER EL MODO DE JUEGO EN 1 JUG
      if (this.mode === 'multiPlayer') {
        socket.emit('leaveMultiPlayer'); // tell the server to remove the player from the multiplayer game
      }
      this.mode = "singlePlayer";
      if (this.mode === "singlePlayer") {
        this.$router.push('/GameScreen');
      }

    },
    startMultiPlayerMode() {
      this.multiplayerBtn_desabilitado = true; 

      // PONER EL MODO DE JUEGO EN +1 JUG
      this.mode = "multiPlayer";
      // UPDATEAR EL CONTADOR DE JUGADORES
      this.updatear_players();
      // EMITIR EVENTO DE QUE EL JUGADOR SE HA UNIDO A UNA SALA
      socket.emit("unirse_room", this.roomId);
      this.roomId++;
      // EMITIR EVENTO DE SUFICIENTES JUGADORES ?
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
  created() {
    socket.on("empezarJuego-mult", () => {
      console.log("Redireccionando a pantalla de juego");
      if (this.mode === "multiPlayer") {
        this.$router.push('/GameScreenMult');
      }

    });
  },
  beforeDestroy() {
    if (socket) {
      socket.disconnect();
    }

  },
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anek+Bangla&display=swap');

body {
  padding: 0;
  margin: -10px;
  font-family: 'Anek Bangla', sans-serif;
  height: 100vh;
  background-repeat: repeat;
  overflow-x: hidden;
  overflow-y: hidden;
  letter-spacing: 0.3rem;
  font-weight: lighter;
  background-color: rgba(226, 222, 222, 0.815);
  /*background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url("/giphy.gif");*/

}

* {
  border-radius: 15px;
}

.lobby-container {
  display: grid;
  align-items: center;
  justify-content: center;
  color: #1c1c1c;
}

.lobby-title {
  font-size: 100px;

}

.lobby-options {
  text-align: center;
  display: grid;
  gap: 10px;
}


div p {
  margin-bottom: 10px;
  font-size: 25px;
}

.btn {
  padding: 50px;
  height: 150px;
  width: 150px;
  background-color: #1c1c1c;
  color: #f5f5f5;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.4s ease-out, font-size 0.2s ease-out;
  font-size: 25px;


}

.btn:hover {
  background-color: #dfdfdf;
  color: #1c1c1c;
  font-size: 30px;
  transition: background-color 0.3s ease-out, font-size 0.2s ease-in-out;
  box-shadow: 3px 1px 5px rgba(0, 0, 0, 0.1);
}

.player-info {
  margin-top: 20px;
  text-align: center;

}

@media (max-width: 1000px) {

  * {
    margin: 5%;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .lobby-title {
  
    font-size: 60px;
  }

  .btn {
    display: flex;
    margin-left: auto;
    margin-right: auto;
   
  }
}
</style>
