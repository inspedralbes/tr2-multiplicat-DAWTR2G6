import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // informacion de la partida de modo un jugador
  state: {
    // preguntas de esa partida que salieron antes de acabar el juego/tiempo
    partida_preguntas: [],
    // respuestas correctas de las preguntas que salieron antes de acabar el juego/tiempo
    partida_respuestas: [],
    // respuestas del usuario a las preguntas que salieron antes de acabar el juego/tiempo
    partida_usuario_respuestas: [],
  },
  mutations: {
    setPartidaPreguntas(state, preguntas) {
      state.partida_preguntas = preguntas;
    },
    setPartidaRespuestas(state, respuestas) {
      state.partida_respuestas = respuestas;
    },
    setPartidaUsuarioRespuestas(state, usuario_respuestas) {
      state.partida_usuario_respuestas = usuario_respuestas;
    },
  },
});