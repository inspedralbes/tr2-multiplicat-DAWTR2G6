<template>
  <div class="container">
    <h2 class="mt-5">Pantalla de Juego</h2>
    <!-- Lógica y elementos del juego -->
  </div>
</template>

<script>
export default {
  name: 'GameScreen',
  mounted() {
    // Escuchar el evento para navegar a la pantalla de juego
    this.$socket.on('redirectPantallaJuego', () => {
      // Utilizar Vue Router para navegar
      this.$router.push({ name: 'GameScreen' }); // Asegúrate de tener configurado Vue Router correctamente
    });
  }
};
</script>