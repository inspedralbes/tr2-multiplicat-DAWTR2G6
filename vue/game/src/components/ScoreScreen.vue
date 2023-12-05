<template>
  <div class="score-container">
    <h2>PUNTUACIO DE LA PARTIDA: {{ score }}/{{ preguntas_filtradas.length }}</h2>
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
</template>
<script>
import { useStore } from "../store";


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
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.score-container h2 {
  font-size: 1.5em;
  color: #3498db;
  margin-bottom: 20px;
}

.score-container button {
  margin: 10px;
  padding: 10px 20px;
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
}

.score-container button:hover {
  background-color: #2980b9;
  transform: scale(1.1);
}

.score-subtitle {
  font-size: 1.2em;
  color: #333;
  margin-top: 20px;
}

.score-form {
  margin-top: 10px;
}

.form-group {
  list-style-type: none;
  padding: 0;
}

.form-group li {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.form-group li p {
  margin: 0;
}
</style>
