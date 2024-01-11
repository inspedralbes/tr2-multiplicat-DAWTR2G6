<template>
  <div class="score-container">
    <div class="header">
      <h2>Puntuación: {{ score }} / {{ totalQuestions }}</h2>
      <div class="button-group">
        <button class="home-button" @click="$router.push('/')">Home</button>
        <button class="lobby-button" @click="$router.push('/lobby')">Ir al Lobby</button>
      </div>
    </div>

    <div class="main-content">
      <div class="chart-container">
        <canvas id="scoreChart"></canvas>
      </div>

      <h3>Revisa tus respuestas incorrectas:</h3>
      <div class="toggle-container">
        <button @click="toggleShowAnswers" class="toggle-button">
          {{ showAnswers ? 'Ocultar Respuestas' : 'Mostrar Respuestas' }}
        </button>
      </div>

      <div v-if="showAnswers" class="incorrect-answers-container">
        <div v-for="(pregunta, index) in preguntas_filtradas" :key="index" class="incorrect-answer">
          <div class="question-info">
            <p class="question">{{ pregunta.pregunta }}</p>
            <p class="correct-answer">Respuesta correcta: {{ pregunta.respuesta_correcta }}</p>
          </div>
          <div class="user-answer-info">
            <p class="user-answer">Tu respuesta: {{ pregunta.user_respuesta }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../store";
import Chart from "chart.js/auto";
import { onMounted, ref, computed } from "vue";

export default {
  name: "ScoreScreen",
  setup() {
    const store = useStore();
    const score = ref(0);
    const preguntas_filtradas = ref([]);
    const totalQuestions = ref(0);
    const showAnswers = ref(true);

    const hasIncorrectAnswers = computed(() => preguntas_filtradas.value.length > 0);

    const toggleShowAnswers = () => {
      showAnswers.value = !showAnswers.value;
    };

    onMounted(() => {
      const preguntas = store.returnPreguntas_sp();
      const respuestas = store.returnRespuestas_sp();
      const usuarioRespuestas = store.returnUsuarioRespuestas_sp();

      totalQuestions.value = preguntas.length;

      for (let i = 0; i < totalQuestions.value; i++) {
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

      const scoreChart = new Chart(document.getElementById('scoreChart'), {
        type: 'doughnut',
        data: {
          labels: ['Correctas', 'Incorrectas'],
          datasets: [{
            data: [score.value, totalQuestions.value - score.value],
            backgroundColor: ['#80D483', '#FF6C6C'],
            borderWidth: 0,
          }]
        },
        options: {
          cutout: '80%',
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
        }
      });
    });

    return {
      score,
      preguntas_filtradas,
      totalQuestions,
      hasIncorrectAnswers,
      showAnswers,
      toggleShowAnswers,
    };
  },
};
</script>

<style scoped>
/* Contenedor principal */
.score-container {

  font-family: "Anek Bangla", sans-serif;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #F4F7FC 0%, #D3DAEB 100%);
}

/* Encabezado */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2e263f;
  color: #fff;
  border-radius: 15px 15px 0 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.header h2 {
  margin: 0;
  font-size: 24px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.home-button, .lobby-button {
  padding: 12px 20px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.home-button {
  background-color: #007BFF;
}

.home-button:hover, .lobby-button:hover {
  background-color: #0056b3;
}

.lobby-button {
  background-color: #1c1c1c;
}

/* Contenido principal */
.main-content {
  flex-grow: 1;
  padding: 20px;
  border-radius: 0 0 15px 15px;
}

/* Gráfico de puntuación */
.chart-container {
  width: 100%;
  text-align: center;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  border-radius: 15px 15px 0 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Respuestas incorrectas */
h3 {
  font-size: 22px;
  color: #1c1c1c;
  margin-bottom: 15px;
}

.toggle-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-button {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #1c1c1c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.toggle-button:hover {
  background-color: #333;
}

.incorrect-answers-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  overflow-y: auto;
}

.incorrect-answer {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.incorrect-answer:hover {
  transform: translateY(-5px);
}

.question-info {
  margin-bottom: 15px;
}

.question {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.correct-answer {
  color: rgb(100, 128, 0);
}

.user-answer-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-answer {
  color: rgba(255, 8, 0, 0.911);
  margin-bottom: 15px;
}
</style>
