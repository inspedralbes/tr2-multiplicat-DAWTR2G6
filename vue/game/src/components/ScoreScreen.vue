<template>
  <div class="score-container">
    <h2>PUNTUACIO DE LA PARTIDA: {{ score }}</h2>
    <div class="v-if">
      <button @click="$router.push('/lobby')">Ves'ne al Lobby</button>
      <button @click="$router.push('/ranking')">Mira com vas al rankings!</button>
    </div>
    <h3 class="score-subtitle">Revisa les teves respostes incorrectes aqui!:</h3>

    <div class="score-form">
      <ul class="form-group">
        <li v-for="(pregunta, index) in preguntas_filtradas" :key="index">
          <p>{{ pregunta.pregunta }}</p>
          <p>Resposta correcta: {{ pregunta.respuesta_correcta }}</p>
          <p>La teva resposta: {{ pregunta.user_respuesta }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { useStore } from "../store";
import { ref, onMounted } from 'vue';

export default {
  name: "ScoreScreen",
  setup() {
    const score = ref(0);
    const preguntas_filtradas = ref([]);
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
    });

    return {
      score,
      preguntas_filtradas
    };
  },
}
</script>

<style scoped>
.score-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.score-title {
  font-family: "Arial", sans-serif;
  font-size: 2em;
  color: #3498db;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.score-subtitle {
  font-family: "Arial", sans-serif;
  font-size: 1.5em;
  color: #3498db;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
}

.score-form {
  width: 300px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #3498db;
  border-radius: 5px;
  font-size: 1em;
  color: #333;
  outline: none;
}
</style>
