<template>
  <body>
    <div class="score-container">
      <h2>PUNTUACIO DE LA PARTIDA: {{ score }}/{{ totalPreguntas }}</h2>
      <button @click="$router.push('/lobby')">Ves'ne al Lobby</button>
      <button @click="$router.push('/ranking')">
        Mira com vas al rankings!
      </button>
    </div>

    <h3>Revisa les teves respostes incorrectes aqui!:</h3>
    <div class="preguntas-incorrectas-container" v-if="preguntas_filtradas.length > 0">
      <div
        v-for="(pregunta, index) in preguntas_filtradas"
        :key="index"
        class="score-preguntas-incorrectas"
      >
        <p>{{ pregunta.pregunta }}</p>
        <p>Resposta correcta: {{ pregunta.respuesta_correcta }}</p>
        <p>La teva resposta: {{ pregunta.user_respuesta }}</p>
      </div>
    </div>
  </body>
</template>
<script>

import { socket } from "../socket";
import { useStore } from "../store";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

export default {
  data() {
    return {};
  },
  name: "ScoreScreen",
  setup() {
  
    const score = ref(0);
    const preguntas_filtradas = ref([]);
    const store = useStore();
    console.log("Estado Inicial del Store:", store.state);
    const route = useRoute();
    const socketId = route.params.id;

    onMounted(() => {
      console.log("Datos de preguntas:", store.partida_preguntas);
      console.log("Datos de respuestas:", store.partida_respuestas);
      console.log(
        "Datos de respuestas de usuario:",
        store.partida_usuario_respuestas
      );
      if (
        store.partida_preguntas &&
        store.partida_respuestas &&
        store.partida_usuario_respuestas &&
        store.partida_preguntas.hasOwnProperty(socketId) &&
        Array.isArray(store.partida_preguntas[socketId]) &&
        Array.isArray(store.partida_respuestas[socketId]) &&
        Array.isArray(store.partida_usuario_respuestas[socketId]) &&
        store.partida_preguntas[socketId].length ===
          store.partida_respuestas[socketId].length &&
        store.partida_respuestas[socketId].length ===
          store.partida_usuario_respuestas[socketId].length
      ) {
        let preguntas = store.partida_preguntas[socketId];
        let respuestas = store.partida_respuestas[socketId];
        let usuarioRespuestas = store.partida_usuario_respuestas[socketId];

        for (let i = 0; i < preguntas.length; i++) {
          if (respuestas[i] !== usuarioRespuestas[i]) {
            preguntas_filtradas.value.push({
              pregunta: preguntas[i],
              respuesta_correcta: respuestas[i],
              user_respuesta: usuarioRespuestas[i],
            });
          }
        }

        // Calcular el puntaje (puedes ajustar esta lógica según tus reglas de puntuación)
        score.value = preguntas.length - preguntas_filtradas.value.length;
      } else {
        console.error(
          "Datos de juego no válidos o no existen para el socketId proporcionado."
        );
      }
    });

    return {
      score,
      preguntas_filtradas,
      totalPreguntas: store.partida_preguntas[socketId]
        ? store.partida_preguntas[socketId].length
        : 0,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Anek+Bangla&display=swap");

body {
  padding: 0;
  margin: 0;
}

* {
  font-family: "Anek Bangla", sans-serif;
  z-index: -1;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  letter-spacing: 0.1rem;
}

.score-container {
  display: grid;
  position: sticky;
  width: 100%;
  top: 0px;
  padding: 1%;
  font-size: 30px;
  text-align: center;
  border: 2px solid #1c1c1c;
  background-color: #dfdfdf;
  z-index: 1;
}

h3 {
  text-align: center;
  font-size: 30px;
  color: #1c1c1c;
  margin: 10px;
}

.score-container button:nth-child(2),
.score-container button:nth-child(3) {
  margin: 10px;
  padding: 8px;
  font-weight: 400;
  background-color: #1c1c1c1a;
  color: #1c1c1c;
  box-shadow: 1px 1px 1px 1px black;
  font-size: 20px;
}

.score-container button:nth-child(2):hover,
.score-container button:nth-child(3):hover {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}

.preguntas-incorrectas-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.score-preguntas-incorrectas {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "pregunta"
    "respuesta_correcta"
    "user_respuesta";
  background-color: #dfdfdf;
  border: 2px solid black;
  height: 200px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  font-weight: 900;
}

.score-preguntas-incorrectas p:nth-child(1) {
  grid-area: pregunta;
  font-size: 18px;
}

.score-preguntas-incorrectas p:nth-child(2) {
  margin: 10px;
  color: rgb(100, 128, 0);
  grid-area: respuesta_correcta;
}

.score-preguntas-incorrectas p:nth-child(3) {
  color: rgba(255, 8, 0, 0.911);
  grid-area: user_respuesta;
}
</style>
