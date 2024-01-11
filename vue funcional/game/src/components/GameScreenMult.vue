<template>
    <body>
      <div class="game-container">
      <div class="panel-juego" v-if="preguntas_guardadas">
  
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
            modo: "mutiplayer",
            players: {},
        };
    },
    methods: {
        async cargarPreguntas() {
            try {
                const response = await fetch(
                    "http://xifraxaladag6.daw.inspedralbes.cat/backend/public/api/recibir-preguntas-todas"
                );
                this.data_preguntas = await response.json();


                if (
                    this.data_preguntas &&
                    this.data_preguntas["preguntas_unidades"] &&
                    Array.isArray(this.data_preguntas["preguntas_unidades"])
                ) {
                    const preguntasUnidades = this.data_preguntas["preguntas_unidades"];

                    // Fisher-Yates shuffle ....
                    for (let i = preguntasUnidades.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [preguntasUnidades[i], preguntasUnidades[j]] = [
                            preguntasUnidades[j],
                            preguntasUnidades[i],
                        ];
                    }

                    // getPreguntaActual = preguntaActual {pregunta=..., opciones=...., respuesta_correcta=....}
                    this.preguntaActual = this.getPreguntaActual();
                    this.preguntas_guardadas = true;


                } else {
                    console.error("preguntas_unidades is not an array or is undefined.");
                }
            } catch (error) {
                console.error("Error al cargar la pregunta:", error);
            }
        },
        evento_respuestaEnviada(opcion) {
            const respuestaUsuarioTrimmed = opcion.trim();
            const respuestaCorrecta = this.preguntaActual.respuesta_correcta.trim();

            if (respuestaUsuarioTrimmed === respuestaCorrecta) {
                // respuesta correcta
                // emitir evento para actualizar los bloques de los demas jugadores
                socket.emit("enviar_bloques", socket.id);
                // emitir evento para mandar efectos visuales a los demas jugadores, todos menos aquel que manda la instancia de socket

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
            console.log("Paso por partidaAcabada()");
            console.log("this.players", this.players);
            const store = useStore();

            store.guardar_allData(socket.id, this.partida_preguntas, this.partida_respuestas, this.partida_usuario_respuestas);

            socket.emit("partida_acabada");

        },
    },
    created() {
        socket.on('establecerJugadores', (players) => {
            this.players = players;
        });


        socket.on('guardar_datos_partida_multi', () => {
            console.log("Paso por guardar_datos_partida_multi");
            this.partidaAcabada();
        });

        socket.on('updatear_bloques_cliente', (arr_jugadors) => {

            console.log(arr_jugadors);
            console.log(arr_jugadors[socket.id]);
            this.blocks = arr_jugadors[socket.id].blocks;
            if (this.blocks === 0) {
                console.log("Voy a madnar solicitud de acabar partida (emit)");
                //envio al servidor una solicitud para acabar
                socket.emit("solicitud_acabar_partida",);
            }
        });
        socket.on('mover_sala_a_scores', () => {
            console.log("Paso por mover_sala_a_scores");
            console.log("socket.id", socket.id);

            this.$router.push({ name: 'scoresMulti', params: { id: socket.id } });
        });






        // ------------------------------------------------------------------------------------

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
.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("/space_background.jpg") center/cover no-repeat;
}

.panel-juego {
  margin: 60px;
  padding: 40px;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  background-color: rgba(243, 118, 216, 0.075); /* Fondo semi-transparente */
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
  transition: width 1s cubic-bezier(0.77, 0, 0.175, 1); /* Efecto de transición */
}

.fire-animation {
  animation: fireAnimation 0.9s ease-in-out infinite;
}

@keyframes fireAnimation {
  0%, 100% {
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
      margin: 0px;
      min-width: auto;
      min-height: auto;
      margin-top: 4%;
      padding: 7px;
      display: grid;
      grid-template-columns: 1fr;
    }

    .pregunta-destacada {
    font-size: 180%;
    color: #ffffff;
    margin-bottom: 10px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

    .options {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px; /* Add some margin to separate from the highlighted question */
      position: relative;
    }

    .option {
      margin: 15px;
      padding: 25px 40px;
      font-size: 22px;
      width: 100%;
      border: 3px solid #67a4e1;
      background-color: #203142;
      color: #ffffff;
      border-radius: 25px;
      cursor: pointer;
      transition: background 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
      box-shadow: 0 0 15px rgba(108, 17, 253, 0.5);
    }

    .tetris-container {
      margin-top: 10px; /* Add some margin to separate from the options */
      position: relative;
    }
  }
</style>
