import { defineStore } from 'pinia';

export const guardar_sp_data = defineStore({
  id: 'sp_data',
  state: () => ({
    partida_preguntas: [],
    partida_respuestas: [],
    partida_usuario_respuestas: [],
  }),
  // metodos que se pueden llamar desde cualquier 
  // componente o  con  guar
  
  actions: {
    setPartidaPreguntas(preguntas) {
      this.partida_preguntas = preguntas;
    },
    setPartidaRespuestas(respuestas) {
      this.partida_respuestas = respuestas;
    },
    setPartidaUsuarioRespuestas(usuario_respuestas) {
      this.partida_usuario_respuestas = usuario_respuestas;
    },
    // para guardar todos los datos de todas las partidas para el profesor // hacer un grafico luego ?
    // filtrar preguntas incorrectas contar las categorias y mostrarlas en un grafico
    // filtrar preguntas correctas contar las categorias y mostrarlas en un grafico
    guardar_sp_allData({preguntas, respuestas, usuario_respuestas}) {
      this.partida_preguntas.push(preguntas);
      this.partida_respuestas.push(respuestas);
      this.partida_usuario_respuestas.push(usuario_respuestas);
    }
  },
});