<template>
    <div class="container">
        <h2 class="mt-5">Pantalla de Juego</h2>

        <div v-if="preguntas_guardadas">
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

                socket.emit("enviar_bloques", socket.id);

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
            store.setPartidaUsuarioRespuestas(this.partida_usuario_respuestas);
            store.setPartidaPreguntas(this.partida_preguntas);
            store.setPartidaRespuestas(this.partida_respuestas);
            store.guardar_sp_allData(
                this.partida_preguntas,
                this.partida_respuestas,
                this.partida_usuario_respuestas
            );
            // return_sp_data.js  -------------------------------------------------------------------------------------------------------


            socket.emit("empujar_todosJugs_pantallaScores", this.players);
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
        });
        socket.on('empujar_a_pantallaScore', () => {
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
</style>
  