import { defineStore } from 'pinia';


export const useStore = defineStore({
  id: 'main',
  state: () => ({
    preguntas: [],
    respuestas: [],
    usuario_respuestas: [],
    preguntas_sp: [],
    respuestas_sp: [],
    usuario_respuestas_sp: [],
    categoria: '',
  }),

  actions: {
    setCategoria(categoria) {
      this.categoria = categoria;
    },
    returnCategoria() {
      return this.categoria;
    },
    resetCategoria() {
      this.categoria = '';
    },
    returnPreguntas(socketId) {
      return this.preguntas[socketId];
    },
    returnRespuestas(socketId) {
      return this.respuestas[socketId];
    },
    returnUsuarioRespuestas(socketId) {
      return this.usuario_respuestas[socketId];
    },
    guardar_allData(socketId, preguntas, respuestas, usuario_respuestas) {
      this.preguntas[socketId] = preguntas;
      this.respuestas[socketId] = respuestas;
      this.usuario_respuestas[socketId] = usuario_respuestas;
    },
    setPartidaUsuarioRespuestas(usuarioRespuestas) {
      this.usuario_respuestas_sp = usuarioRespuestas;
    },
    setPartidaPregunta_sp(preguntas) {
      this.preguntas_sp = preguntas;
    },
    setPartidaRespuestas_sp(respuestas) {
      this.respuestas_sp = respuestas;
    },
    setPartidaUsuarioRespuestas_sp(usuarioRespuestas) {
      this.usuario_respuestas_sp = usuarioRespuestas;
    },
    returnPreguntas_sp() {
      return this.preguntas_sp;
    },
    returnRespuestas_sp() {
      return this.respuestas_sp;
    },
    returnUsuarioRespuestas_sp() {
      return this.usuario_respuestas_sp;
    },
    guardar_sp_data(preguntas, respuestas, usuario_respuestas) {

      this.preguntas_sp = preguntas;
      this.respuestas_sp = respuestas;
      this.usuario_respuestas_sp = usuario_respuestas;
    },
  },


});


