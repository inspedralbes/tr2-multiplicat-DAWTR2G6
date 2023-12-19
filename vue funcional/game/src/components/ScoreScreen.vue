<template>
  <body>
    <div class="score-container">
      <h2>PUNTUACIO DE LA PARTIDA:{{ score }} de {{ preguntas_filtradas.length+score }}
      </h2>
      <button @click="$router.push('/lobby')">Ves'ne al Lobby</button>
      <div class="ScoreGrafico">
        <canvas id="scoreChart"></canvas>
      </div>
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
import { useStore } from "../store";
import Chart from "chart.js/auto";
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
    const chart = ref(null);

    onMounted(() => {

      let preguntas = store.returnPreguntas_sp();
      let respuestas = store.returnRespuestas_sp();
      let usuarioRespuestas = store.returnUsuarioRespuestas_sp();
      console.log("preguntas", preguntas);
      console.log("respuestas", respuestas);
      console.log("usuarioRespuestas", usuarioRespuestas);

      for (let i = 0; i < preguntas.length; i++) {
        if (respuestas[i] === usuarioRespuestas[i]) {
          score.value++;
        } else {
          preguntas_filtradas.value.push({
            pregunta: preguntas[i],
            respuesta_correcta: respuestas[i],
            user_respuesta: usuarioRespuestas[i],
          });
        }
      }

      chart.value = new Chart(document.getElementById('scoreChart'), {
        type: 'pie',
        data: {
          labels: ['Correctas', 'Incorrectas'],
          datasets: [{
            label: '# of Votes',
            data: [score.value, preguntas.length - score.value],
            backgroundColor: [
              '#80D483',
              '#FF6C6C'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        
      });
    });

     


    return {
      score,
      preguntas_filtradas,
      chart
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

.ScoreGrafico{
  width: 10%;
  margin: 0 auto;
  position: relative;
  top: -11
  0%;
  right: -42%;
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
  height: 200px;
}

h3 {
  text-align: center;
  font-size: 30px;
  color: #1c1c1c;
  margin: 10px;
}

.score-container button:nth-child(2) {
  margin: 10px;
  padding: 8px;
  font-weight: 400;
  background-color: #1c1c1c1a;
  color: #1c1c1c;
  box-shadow: 1px 1px 1px 1px black;
  font-size: 20px;
  position: relative;
  width: 20%;
  top: -70px;
}

.score-container button:nth-child(2):hover {
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
