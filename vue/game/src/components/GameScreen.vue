<template>
  <div class="container">
    <h2 class="mt-5">Pantalla de Juego</h2>

    <!-- Mostrar Pregunta y Campo de Respuesta -->
    <div v-if="preguntas_guardadas">
      <p>{{ preguntaActual.enunciado }}</p>

      <div class="options">
        <div v-for="(opcion, index) in preguntaActual.opciones" :key="index" class="option">
          {{ opcion }}
        </div>
      </div>

      <div class="tetris-container">
        <BlockElement v-for="blockIndex in blocks" :key="blockIndex" :cantidad="blockIndex" />
      </div>

      <input v-model="usuario_respuesta_preguntaActual" @keyup.enter="evento_respuestaEnviada" />

      <p>{{ usuario_respuesta_preguntaActual }}</p>
    </div>
  </div>
</template>

<script>
import { socket } from "../socket.js";
import BlockElement from "@/components/BlockElement.vue"; // Ajusta la ruta según la ubicación real de tu componente
export default {
  name: 'GameScreen',
  components: {
    BlockElement,
  },
  data() {
    return {
      data_preguntas: [],
      index: 0,
      blocks: 5,
      preguntas_guardadas: false,
      preguntaActual: null,
      usuario_respuesta_preguntaActual: "",
      partida_preguntas: [],
      partida_respuestas: [],
    };
  },
  methods: {
    async cargarPreguntas() {
      try {
        const response = await fetch("http://localhost:8000/api/recibir-preguntas-todas");
        this.data_preguntas = await response.json();

        this.preguntaActual = this.getPreguntaActual();
        this.preguntas_guardadas = true;
      } catch (error) {
        console.error("Error al cargar la pregunta:", error);
      }
    },
    evento_respuestaEnviada() {
      const respuestaUsuarioTrimmed = this.usuario_respuesta_preguntaActual.trim();
      const respuestaCorrecta = this.preguntaActual.respuesta_correcta.trim();

      if (respuestaUsuarioTrimmed === respuestaCorrecta) {
        // respuesta correcta 
        this.blocks -= 1;
        if (this.blocks === 0) {
          partidaAcabada();
        }
      } else {
        // respuesta incorrecta
        this.blocks += 1;
      }

      this.guardarRespuestasParaProfesor();

      if (this.index < this.data_preguntas["preguntas_unidades"].length - 1) {
        this.index++;
        this.preguntaActual = this.getPreguntaActual();
      } else {
        console.log('No hay más preguntas disponibles');
      }
    },
    getPreguntaActual() {
      return {
        enunciado: this.data_preguntas["preguntas_unidades"][this.index].pregunta,
        opciones: JSON.parse(this.data_preguntas["preguntas_unidades"][this.index].opciones),
        respuesta_correcta: this.data_preguntas["preguntas_unidades"][this.index].respuesta_correcta,
      };
    },
    guardarRespuestasParaProfesor() {
      this.partida_preguntas.push(this.preguntaActual.enunciado.trim());
      this.partida_respuestas.push(this.preguntaActual.respuesta_correcta.trim());
    },
  },
  beforeDestroy() {
    socket.off('redirectPantallaJuego');
  },
  mounted() {
    this.cargarPreguntas();
    socket.on('redirectPantallaJuego', () => {
      this.cargarPreguntas();
    });
  }
};
</script>


<style scoped>

.tetris-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}


.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2em;
  color: #3498db;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

p {
  margin: 10px 0;
  color: #555;
  font-size: 1.2em;
}

input {
  padding: 12px;
  margin: 15px 0;
  width: 70%;
  border: 2px solid #3498db;
  border-radius: 5px;
  font-size: 1em;
  color: #333;
  outline: none;
}

.options {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.option {
  margin: 0 10px;
  padding: 12px;
  border: 2px solid #2ecc71;
  border-radius: 8px;
  cursor: pointer;
  background-color: #2ecc71;
  color: #fff;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

.option:hover {
  background-color: #27ae60;
}

/* Agrega estilos adicionales según tus preferencias */
</style>

