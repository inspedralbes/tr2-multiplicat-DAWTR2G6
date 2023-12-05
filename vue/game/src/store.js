import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    partida_preguntas: [],
    partida_respuestas: [],
    partida_usuario_respuestas: [],
    isLoggedIn: false,
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
    guardar_sp_allData({ preguntas, respuestas, usuario_respuestas }) {
      this.partida_preguntas.push(preguntas);
      this.partida_respuestas.push(respuestas);
      this.partida_usuario_respuestas.push(usuario_respuestas);
    },
    // async login(credentials) {
    //   try {
    //     const response = await axios.post('http://localhost:8000/api/login', credentials);
    //     if (response.data.status === 1) {
    //       this.isLoggedIn = true;
    //     }
    //   } catch (error) {
    //     this.isL
    //     console.error(error);
    //   }
    // },
    // async logout() {
    //   try {
    //     const response = await axios.get('http://localhost:8000/api/logout');
    //     if (response.data.status === 1) {
    //       this.isLoggedIn = false;
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
  },
});