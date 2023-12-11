<template>
    <body>
        <div class="container">
            <h2 class="title">Avança més rapid que els altres!</h2>

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
            modo: 'mutiplayer',
            players: [],
        };
    },
    methods: {
        async cargarPreguntas() {
            try {
                const response = await fetch("http://localhost:8000/api/recibir-preguntas-todas");
                this.data_preguntas = await response.json();

                // para que no sean las mismas preguntas cada vez que se inicia el juego
                if (Array.isArray(this.data_preguntas["preguntas_unidades"])) {
                    // Fisher-Yates shuffle ....
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
                    // para que no sean las mismas preguntas cada vez que se inicia el juego

                    // getPreguntaActual = preguntaActual {pregunta=..., opciones=...., respuesta_correcta=....}
                    this.preguntaActual = this.getPreguntaActual();
                    this.preguntas_guardadas = true;
                } else {
                    console.error("preguntas_unidades is not an array.");
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
            console.log("Game Over!");

            // return_sp_data.js :: guardando para luego usar en ScoreScreen -------------------------------------------------------------------------------------------------------
            const store = useStore(); // referencia a return_sp_data.js
            // store.setPartidaUsuarioRespuestas(this.partida_usuario_respuestas);
            // store.setPartidaPreguntas(this.partida_preguntas);
            // store.setPartidaRespuestas(this.partida_respuestas);
            store.guardar_sp_allData(
                socket.id,
                this.partida_preguntas,
                this.partida_respuestas,
                this.partida_usuario_respuestas,

            );
            // return_sp_data.js  -------------------------------------------------------------------------------------------------------


            socket.emit("partida_acabada", this.players);
        },
    },
    created() {
        socket.on('establecer_players', (players) => {
            this.players = players;
        });
        socket.on('updatear_bloques_cliente', (arr_jugadors) => {
            // arr_jugadors[id].blocks  POL 5 
            // arr_jugadors[id].blocks  JOSU 5
            // POL RESPONDE BIEN
            // arr_jugadors[id].blocks  POL 4
            // Created escucha el evento updatear_bloques_cliente y actualiza el valor de blocks
            // arr_jugadors[id].blocks  JOSU 6
            this.blocks = arr_jugadors[socket.id].blocks;
            if (this.blocks === 0) {
                console.log("Over!");
                this.partidaAcabada();
            }
        });
        socket.on('mover_sala_a_scores', () => {
            console.log("Redireccionando a pantalla de puntuaciones, socket.on('mover_sala_a_scores')");
            this.$router.push('/scores');
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
@import url('https://fonts.googleapis.com/css2?family=Anek+Bangla&display=swap');

body {
    padding: 0;
    margin: -10px;
    font-family: 'Anek Bangla', sans-serif;
    height: 100vh;
    background-repeat: repeat;
    overflow-x: hidden;
    overflow-y: hidden;
    letter-spacing: 0.3rem;
    font-weight: lighter;
    background-color: rgba(226, 222, 222, 0.815);
    /*background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url("/giphy.gif");*/

}

* {
    border-radius: 15px;
}

.tetris-container {
    display: grid;
    align-items: center;
    justify-content: center;
    color: #1c1c1c;
}

.container {
    margin: 60px;
    display: grid;
    min-width: 600px;
    min-height: 300px;
    margin-top: 5%;
    padding: 40px;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: #1c1c1c;
}

h2 {
    font-size: 2em;
}

p {
    font-size: 2em;
}

.options {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.option {
    margin: 0 25px;
    padding: 30px;
    width: auto;
    height: auto;
    border: 3px solid rgba(0, 0, 0, 0.719);
    border-radius: 6px;
    cursor: pointer;
    background-color: #dfdfdf;
    color: #1c1c1ca4;
    font-size: 25px;
    box-shadow: 4px 4px rgb(0, 0, 0);
    transition: box-shadow 0.2s ease-in-out;
}

button {
    width: auto;
    height: auto;
    padding: 10px 20px;
    letter-spacing: 0.3rem;
}

.option:hover {
    box-shadow: 0 0 0 0 rgb(255, 255, 255);
}

.tetris-container {
    display: flex;
    align-content: stretch;
    justify-content: space-between;
    justify-items: stretch;
    width: auto;
    height: auto;
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
        grid-gap: 10px;
    }

    h2 {
        font-size: 1.5em;
    }

    p {
        font-size: 1.5em;
    }

    .options {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    .option {
        margin: 10px;
        padding: 20px;
        font-size: 20px;
        width: 100%;
    }

    button {
        padding: 5px 10px;
    }
}
</style>