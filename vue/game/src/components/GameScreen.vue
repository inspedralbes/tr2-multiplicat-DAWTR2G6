<template>
  <div class="container">
    <h2 class="mt-5">Pantalla de Juego</h2>

    <!-- Mostrar Bloques -->
    <p>Bloques restantes: {{ blocks }}</p>

    <!-- Mostrar Pregunta y Campo de Respuesta -->
    <div v-if="preguntaActual">
      <p>{{ preguntaActual.text }}</p>
      <input v-model="userAnswer" @keyup.enter="submitAnswer" />
    </div>
  </div>
</template>

<script>
import { socket } from "../socket.js";

export default {
  name: 'GameScreen',
  data() {
    return {
      blocks: 5,
      preguntaActual: null,
      usuario_respuesta_preguntaActual: "",
      respuesta_preguntaActual: null,
      index_preguntaActual: 0,
      usuario_respuestas: [],
      usuario_preguntas: [],
      usuario_preguntas_cheatsheet: [],
    };
  },
  methods: {
    async cargarPregunta() {
      try {
        // Hacer la solicitud para obtener la primera pregunta
        const response = await fetch("http://localhost:8000/api/recibir-preguntas-unidades");
        const data = await response.json();

        // pregunta actual
        this.preguntaActual = data.pregunta[this.index_preguntaActual];
        // arr respuestas de usuario 
        this.usuario_preguntas.push(this.preguntaActual);
        // respuesta de la pregunta actual
        this.respuesta_preguntaActual = data.resposta_correcta[this.index_preguntaActual];
        // arr de todas las respuestas correctas de las preguntas de la partida
        this.usuario_preguntas_cheatsheet.push(this.respuesta_preguntaActual);
      } catch (error) {
        console.error("Error al cargar la pregunta:", error);
      }
    },
    submitAnswer() {
      if (this.usuario_respuesta_preguntaActual === this.respuesta_preguntaActual) {
        // respuesta correcta 
        this.blocks -= -1;
      } else {
        // respuesta incorrecta
        this.blocks += 1;
      }
      cargarPregunta();
    },
  },
  mounted() {
    // Escuchar el evento para navegar a la pantalla de juego y cargar la primera pregunta
    socket.on('redirectPantallaJuego', () => {
      this.cargarPregunta();
    });
  }
};
</script>
