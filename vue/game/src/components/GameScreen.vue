<template>
<div class="game-container specific-page">
    <div class="panel-juego" v-if="preguntas_guardadas">
      <div class="progress-container">
        <div :class="{ 'progress-bar': true, 'fire-animation': mostrarAnimacionFuego }"
          :style="{ width: progresoPreguntas + '%' }"></div>
      </div>

      <div class="question-container">
        <p class="pregunta-destacada">{{ preguntaActual.enunciado }}</p>
      </div>

      <div class="options">
        <button v-for="(opcion, index) in preguntaActual.opciones" :key="index" class="option"
          @click="evento_respuestaEnviada(opcion)">
          {{ opcion }}
        </button>
      </div>

      <div class="tetris-container">
        <BlockElement v-for="blockIndex in blocks" :key="blockIndex" :cantidad="blockIndex" />
      </div>
    </div>
    </div>
</template>

<script>
import { useStore } from "../store";
import { socket } from "../socket.js";
import BlockElement from "@/components/BlockElement.vue";

export default {
  name: "GameScreen",
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
      partida_usuario_respuestas: [],
      partida_preguntas: [],
      partida_respuestas: [],
      modo: 'solitario',
      players: [],
      categoria: '',
      preguntasRespondidas: 0,
      totalPreguntas: 0,
      respuestasCorrectasSeguidas: 0, // Nuevo estado para contar respuestas correctas consecutivas
    };
  },
  computed: {
    progresoPreguntas() {
      return (this.preguntasRespondidas / this.totalPreguntas) * 100;
    },
    mostrarAnimacionFuego() {
      // Mostrar la animación de fuego después de dos respuestas correctas seguidas
      return this.respuestasCorrectasSeguidas >= 2;
    },
  },
  methods: {
    async cargarPreguntas() {
      try {
        const store = useStore();
        this.categoria = store.returnCategoria();
        if (this.categoria === '') {
          const response = await fetch("http://localhost:8000/api/recibir-preguntas-todas");
          this.data_preguntas = await response.json();

        } else {
          const response = await fetch("http://localhost:8000/api/recibir-preguntas-porCategoria/" + this.categoria);
          this.data_preguntas = await response.json();
        }

        this.aleatorizarPreguntas();

        this.preguntaActual = this.getPreguntaActual();
        this.preguntas_guardadas = true;
        this.totalPreguntas = this.data_preguntas["preguntas_unidades"].length;

      } catch (error) {
        console.error("Error al cargar la pregunta:", error);
      }
    },
    evento_respuestaEnviada(opcion) {
      const respuestaUsuarioTrimmed = opcion.trim();
      const respuestaCorrecta = this.preguntaActual.respuesta_correcta.trim();

      if (respuestaUsuarioTrimmed === respuestaCorrecta) {
        this.blocks -= 1;
        if (this.blocks === 0) {
          this.partidaAcabada();
        }

        // Incrementar el contador de respuestas correctas seguidas
        this.respuestasCorrectasSeguidas += 1;
      } else {
        this.blocks += 1;

        // Reiniciar el contador si la respuesta es incorrecta
        this.respuestasCorrectasSeguidas = 0;
      }

      this.guardarRespuestasParaProfesor(opcion);
      this.preguntasRespondidas += 1;

      if (this.index < this.totalPreguntas - 1) {
        this.index++;
        this.preguntaActual = this.getPreguntaActual();
      } else {
        console.log("No hay más preguntas disponibles");
        this.partidaAcabada();
      }
    },
    getPreguntaActual() {
      return {
        enunciado: this.data_preguntas["preguntas_unidades"][this.index].pregunta,
        opciones: JSON.parse(
          this.data_preguntas["preguntas_unidades"][this.index].opciones
        ),
        respuesta_correcta: this.data_preguntas["preguntas_unidades"][this.index]
          .respuesta_correcta,
      };
    },
    guardarRespuestasParaProfesor(opcion) {
      this.partida_usuario_respuestas.push(opcion.trim());
      this.partida_preguntas.push(this.preguntaActual.enunciado.trim());
      this.partida_respuestas.push(this.preguntaActual.respuesta_correcta.trim());
    },
    partidaAcabada() {
      const store = useStore();
      store.setPartidaUsuarioRespuestas(this.partida_usuario_respuestas);
      store.setPartidaPreguntas(this.partida_preguntas);
      store.setPartidaRespuestas(this.partida_respuestas);
      store.guardar_sp_allData(
        this.partida_preguntas,
        this.partida_respuestas,
        this.partida_usuario_respuestas
      );
      this.categoria = '';
      this.$router.push("/scores");
    },
    aleatorizarPreguntas() {
      if (Array.isArray(this.data_preguntas["preguntas_unidades"])) {
        for (let i = this.data_preguntas["preguntas_unidades"].length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [
            this.data_preguntas["preguntas_unidades"][i],
            this.data_preguntas["preguntas_unidades"][j],
          ] = [
              this.data_preguntas["preguntas_unidades"][j],
              this.data_preguntas["preguntas_unidades"][i],
            ];
        }
      } else {
        console.error("preguntas_unidades is not an array.");
      }
    },
  },
  created() {
    socket.on('establecer_players', (players) => {
      this.players = players;
    });
  },
  beforeDestroy() {
    socket.off("redirectPantallaJuego");
  },
  mounted() {
  document.body.classList.add('specific-page');
  this.cargarPreguntas();
  socket.on("redirectPantallaJuego", () => {
    this.cargarPreguntas();
  });
},
};
</script>

<style>
html>body{
  background: url('https://i.pinimg.com/originals/2f/f9/4d/2ff94dfff599bc37a27450a858612763.gif');
}
.specific-page .game-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('https://i.pinimg.com/originals/2f/f9/4d/2ff94dfff599bc37a27450a858612763.gif');
}


.panel-juego {
  margin: 60px;
  padding: 40px;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  background-color: rgba(243, 118, 216, 0.075);
  /* Fondo semi-transparente */
  font-family: Arial, Helvetica, sans-serif;
}

.progress-container {
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4f96d8, #67a4e1);
  width: 0;
  transition: width 1s cubic-bezier(0.77, 0, 0.175, 1);
  /* Efecto de transición */
}

.fire-animation {
  animation: fireAnimation 0.9s ease-in-out infinite;
}

@keyframes fireAnimation {

  0%,
  100% {
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 165, 0, 0.8), 0 0 60px rgba(255, 255, 0, 0.8);
  }

  50% {
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 165, 0, 0.8), 0 0 60px rgba(255, 255, 0, 0.8), 0 0 80px rgba(255, 69, 0, 0.8), 0 0 100px rgba(255, 0, 0, 0.8);
  }
}

.question-container {
  margin-bottom: 20px;
}

.pregunta-destacada {
  font-size: 2.5em;
  font-weight: bold;
  color: #ffffff;
}

.options {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.option {
  margin: 0 20px;
  padding: 20px 40px;
  width: auto;
  border: 3px solid #67a4e1;
  background-color: #203142;
  color: #ffffff;
  border-radius: 25px;
  cursor: pointer;
  font-size: 20px;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 0 0 15px rgba(108, 17, 253, 0.5);
}

.tetris-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1000px) {
  .panel-juego {
    margin: 20px;
    min-width: auto;
    min-height: auto;
    margin-top: 10%;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  .pregunta-destacada {
    font-size: 3em;
  }

  .options {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }

  .option {
    margin: 15px;
    padding: 25px 40px;
    font-size: 22px;
    width: 100%;
  }
}</style>
