<template>
  <body>
    <div class="container">

      <div class="panel-juego" v-if="preguntas_guardadas">
        <p>{{ preguntaActual.enunciado }}</p>

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
  </body>
</template>

<script>
import { useStore } from "../store"; // importar useStore de useStore.js
import { socket } from "../socket.js";
import BlockElement from "@/components/BlockElement.vue"; // Ajusta la ruta según la ubicación real de tu componente
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
    };
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

        // ++index, iterar por data_preguntas, establecer enunciadom opciones y respuesta_correcta
        this.preguntaActual = this.getPreguntaActual();
        this.preguntas_guardadas = true;

      } catch (error) {
        console.error("Error al cargar la pregunta:", error);
      }
    },
    evento_respuestaEnviada(opcion) {

      const respuestaUsuarioTrimmed = opcion.trim();
      const respuestaCorrecta = this.preguntaActual.respuesta_correcta.trim();

      if (respuestaUsuarioTrimmed === respuestaCorrecta) {
        // respuesta correcta
        this.blocks -= 1;
        if (this.blocks === 0) {
          this.partidaAcabada();
        }
      } else {
        // respuesta incorrecta
        this.blocks += 1;
      }

      this.guardarRespuestasParaProfesor(opcion);

      if (this.index < this.data_preguntas["preguntas_unidades"].length - 1) {
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
    this.cargarPreguntas();
    socket.on("redirectPantallaJuego", () => {
      this.cargarPreguntas();
    });
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');

body {
  display: flex;
  font-family: 'Audiowide', cursive;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  color: #ffffff;
  background: url("/space_background.jpg") center/cover no-repeat; /* Reemplaza con tu imagen espacial */
}

.container {
  margin: 60px;
  display: grid;
  min-width: 600px;
  min-height: 300px;
  margin-top: 5%;
  padding: 40px;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
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
  border: 3px solid #67a4e1; /* Color del borde azul espacial */
  background-color: #203142; /* Color de fondo más oscuro */
  color: #ffffff;
  border-radius: 25px;
  cursor: pointer;
  font-size: 20px;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 0 0 15px rgba(108, 17, 253, 0.5);
}

.option:hover,
.option:focus {
  background-color: #2c394b; /* Cambio de color al pasar el ratón para resaltar */
  color: #67a4e1;
  box-shadow: 0 0 20px rgba(103, 164, 225, 0.7); /* Efecto de sombra al pasar el ratón */
}

.option:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(rgba(255, 255, 255, 0.2), transparent);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  z-index: -1;
}

.option:hover:before,
.option:focus:before {
  opacity: 1;
  transform: scale(1.2);
}

.tetris-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1000px) {
  .container {
    margin: 20px;
    min-width: auto;
    min-height: auto;
    margin-top: 10%;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  .title {
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
}
</style>