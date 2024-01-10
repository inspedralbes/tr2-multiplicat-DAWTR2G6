<template>
  <body>
    <div class="score-container">
      <h2>PUNTUACIO DE LA PARTIDA:{{ score }} de {{ preguntas_filtradas.length + score }}
      </h2>
      <button @click="$router.push('/lobby')">Lobby</button><br><br>
      <button @click="$router.push('/')">Home</button>
      <div class="ScoreGrafico">
        <canvas id="scoreChart"></canvas>
      </div>
    </div>

    <h3>Revisa les teves respostes incorrectes aqui!:</h3>
    <div class="preguntas-incorrectas-container" v-if="preguntas_filtradas.length > 0">
      <div v-for="(pregunta, index) in preguntas_filtradas" :key="index" class="score-preguntas-incorrectas">
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
import { useRoute } from 'vue-router';
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
    const route = useRoute();
    const socketId = route.params.id;

    onMounted(() => {

      let preguntas = store.returnPreguntas(socketId);
      let respuestas = store.returnRespuestas(socketId);
      let usuarioRespuestas = store.returnUsuarioRespuestas(socketId);
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
/* Estilo CSS proporcionado para el HTML actual */
.score-container {
  
  width: 100%;
  height: 350px;
  min-height: auto;
  position: sticky;
  background-color:#dfdfdf;
}

.ScoreGrafico {
  height: 250px;
  width: 250px;
  position: absolute;
  left: 50%;
  top: 58%;
  transform: translate(-50%, -50%);
}


h2 {
  margin: 0;
  font-size: 40px;
  color: #000000;
  text-align: center;

}

button {
  padding: 12px 20px;
  font-size: 16px;
  color: #dfdfdf;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #0056b3;
  width: 200px;
  margin-left: 8px;
  padding: 30px;
}

button:hover {
  background-color: #75b1f1;
}



h3 {
  font-size: 42px;
  color: #ffffff;
  text-align: center;
}

.preguntas-incorrectas-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  overflow-y: auto;
  padding: 4%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
}

.score-preguntas-incorrectas {
  margin: 5px;
  height: 100%;
  width: 100%;
  background-color: #dfdfdf;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  font-weight: 700;
  padding: 5%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.score-preguntas-incorrectas:hover {
  transform: translateY(-10px);
}

.score-preguntas-incorrectas>p:nth-child(1){
  font-size: 18px;
  color: #000000;
}
.score-preguntas-incorrectas>p:nth-child(2){
  font-size: 18px;
  color: rgb(100, 128, 0);
}

.score-preguntas-incorrectas>p:nth-child(3){
  font-size: 18px;
  color: rgba(255, 8, 0, 0.911);
}


*{
  font-family: "Anek Bangla", sans-serif;

}
/* Fin del estilo CSS proporcionado */
</style>
