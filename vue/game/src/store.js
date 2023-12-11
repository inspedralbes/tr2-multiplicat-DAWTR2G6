import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    partida_preguntas: {},
    partida_respuestas: {},
    partida_usuario_respuestas: {},
    isLoggedIn: false,
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
    guardar_sp_allData({ playerId, preguntas, respuestas, usuario_respuestas }) {
      this.partida_preguntas[playerId] = preguntas;
      this.partida_respuestas[playerId] = respuestas;
      this.partida_usuario_respuestas[playerId] = usuario_respuestas;
    },
  },
});











