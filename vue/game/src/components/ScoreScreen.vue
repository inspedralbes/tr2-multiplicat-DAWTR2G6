<template>
  <div class="score-container">
    <h2>PUNTUACIO DE LA PARTIDA: {{ score }}/{{preguntas_filtradas.length }}</h2>
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



</style>
