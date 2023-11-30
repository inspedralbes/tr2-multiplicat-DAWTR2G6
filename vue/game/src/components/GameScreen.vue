<template>
  <div class="container">
    <h2 class="mt-5">Pantalla de Juego</h2>
    <!-- Lógica y elementos del juego -->
  </div>
</template>

<script>
import { socket } from "../socket.js";

export default {
  name: 'GameScreen',
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    // Escuchar el evento para navegar a la pantalla de juego
   socket.on('redirectPantallaJuego', () => {
      // Utilizar Vue Router para navegar
      this.$router.push({ name: 'GameScreen' }); // Asegúrate de tener configurado Vue Router correctamente
    });
  }
};
</script>