<template>
  <div class="container">
    <h2 class="mt-5">Pantalla de Juego</h2>

    <!-- Mostrar Bloques -->
    <p>Bloques restantes: {{ blocks }}</p>

    <!-- Mostrar Pregunta y Campo de Respuesta -->

    <div v-if="preguntas_guardadas">
      <p>{{ preguntaActual.enunciado }}</p>
      <input v-model="usuario_respuesta_preguntaActual" @keyup.enter="evento_respuestaEnviada" />

      <p>
        {{ usuario_respuesta_preguntaActual }}
      </p>
    </div>
  </div>
</template>

<script>
import { socket } from "../socket.js";

export default {
  name: 'GameScreen',
  data() {
    return {
      data_preguntas: [],
      index: 0,
      blocks: 5,
      preguntas_guardadas: false,
      // OBJ con la informacion de pregunta actual / index / enunciado / opciones / respuesta-correcta
      preguntaActual: null,
      usuario_respuesta_preguntaActual: "",
      partida_respuestas_usuario: [],
      // PARA EL PROFESSOR --------------------------------------------------------------------------------------------- 
      partida_preguntas: [],
      partida_respuestas: [],
      // PARA EL PROFESSOR --------------------------------------------------------------------------------------------- 

    };
  },
  methods: {
    async cargarPreguntas() {
      try {

        const response = await fetch("http://localhost:8000/api/recibir-preguntas-todas");
        this.data_preguntas = await response.json();

        this.preguntaActual = {
          enunciado: this.data_preguntas[this.index].pregunta,
          opciones: JSON.parse(this.data_preguntas[this.index].opciones),
          respuesta_correcta: this.data_preguntas[this.index].respuesta_correcta
        };
        this.preguntas_guardadas = true;

      } catch (error) {
        console.error("Error al cargar la pregunta:", error);
      }
    },
    evento_respuestaEnviada() {
      if (this.usuario_respuesta_preguntaActual === this.preguntaActual.respuesta_correcta) {
        // respuesta correcta 
        this.blocks -= -1;
        if (this.blocks === 0) {
          partidaAcabada();
        }
      } else {
        // respuesta incorrecta
        this.blocks += 1;
      }
      // PARA EL PROFESSOR --------------------------------------------------------------------------------------------- 
      this.partida_preguntas.push(preguntaActual.enunciado);
      this.partida_respuestas.push(preguntaActual.respuesta_correcta);
      // PARA EL PROFESSOR --------------------------------------------------------------------------------------------- 
      this.index++;
    },

  },
  beforeDestroy() {
    socket.off('redirectPantallaJuego');
  },
  mounted() {
    // socket escucha la llama redirect... y carga la 1era pregunta
    this.cargarPreguntas();
    socket.on('redirectPantallaJuego', () => {
      this.cargarPreguntas();
    });
  }
};
</script>
