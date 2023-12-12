<template>
  <body>
    <div class="score-container">
      <h2>PUNTUACIO DE LA PARTIDA: {{ score }}/{{ totalQuestions }}</h2>
      <button @click="$router.push('/lobby')">Ves al Lobby</button>
      <button @click="$router.push('/ranking')">Mira com vas al ranking!</button>
    </div>

    <h3>Revisa les teves respostes incorrectes aqui!:</h3>
    <div class="preguntas-incorrectas-container">
      <div v-for="(pregunta, index) in preguntas_filtradas" :key="index" class="score-preguntas-incorrectas">
        <p>{{ pregunta.pregunta }}</p>
        <p>Resposta correcta: {{ pregunta.respuesta_correcta }}</p>
        <p>La teva resposta: {{ pregunta.user_respuesta }}</p>
      </div>
    </div>
    <div class="ScoreGrafico">
    <canvas id="scoreChart"></canvas>
</div>
  </body>
</template>

<script>
import { useStore } from "../store";
import Chart from 'chart.js/auto';
import { onMounted, ref } from "vue";
export default {
  name: "ScoreScreen",
  setup() {
    const score = ref(0);
    const preguntas_filtradas = ref([]);
    const totalQuestions = ref(0); // Declare totalQuestions here
    const store = useStore();

    onMounted(() => {
      let preguntas = store.partida_preguntas;
      let respuestas = store.partida_respuestas;
      let usuarioRespuestas = store.partida_usuario_respuestas;

      for (let i = 0; i < preguntas.length; i++) {
        if (respuestas[i] !== usuarioRespuestas[i]) {
          preguntas_filtradas.value.push({
            pregunta: preguntas[i],
            respuesta_correcta: respuestas[i],
            user_respuesta: usuarioRespuestas[i],
          });
        } else {
          score.value++;
        }
      }

  // Calculate totalQuestions
  totalQuestions.value = preguntas.length;
  const canvas = document.getElementById('scoreChart');

      // Check if the canvas element is available
      if (canvas) {
        const ctx = canvas.getContext('2d');

        // Create a pie chart
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Correctes  ', 'Incorrectes'],
            datasets: [{
              data: [score.value, totalQuestions.value - score.value],
              backgroundColor: ['#80D483', '#FF6C6C'],
              color: 'white',
              borderWidth: 1
            }]
          },
          options: {
            
          }
        });
      }
    });

return {
  score,
  preguntas_filtradas,
  totalQuestions,
};
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anek+Bangla&display=swap');

body {
  padding: 20px; /* Add some padding for better overall layout */

}
* {
  font-family: 'Anek Bangla', sans-serif;
  z-index: -1;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  letter-spacing: 0.1rem;

}

.ScoreGrafico {
  background-image: url('https://cdn.dribbble.com/users/2475489/screenshots/9239848/media/ff48675e4dd24c950af1dda5ac3c6019.gif'); /* Reemplaza 'url_de_tu_imagen.jpg' con la ruta de tu imagen */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 212px;
    height: 188px;
    margin: 20px auto;
    position: fixed;
    top: 10%;
    z-index: 2;
    left: 43%;
    color: #e4e0e0;
}
.score-container {
  display: grid;
    position: sticky;
    width: 100%;
    top: 0px;
    padding: 1%;
    font-size: 24px;
    text-align: center;
    border: 2px solid #1c1c1c;
    background-color: #f0f0f0;
    z-index: 1;
    position: relative;
    height: 282px;
}
h3 {
  text-align: center;
  font-size: 30px;
  color: #1c1c1c;
  margin: 10px;
}

.score-container button:nth-child(2){
/* Ajusta este valor según sea necesario para la posición derecha */
  margin: 10px;
  padding: 12px;
  font-weight: 600;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  left: 10px;
}
.score-container button:nth-child(3) {
  margin: 10px;
  padding: 12px;
  font-weight: 600;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
right: 10px;
}

.score-container button:nth-child(2):hover,
.score-container button:nth-child(3):hover {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  background-color: #45a049;
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
  ;
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
