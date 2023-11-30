<template>
  <div class="container">
    <h1 class="mt-5">LANDING-SCREEN</h1>
    <router-link to="/login" class="btn btn-primary mt-3">Iniciar sesión</router-link><br><br>
    <router-link to="/register" class="btn btn-success mt-3">Registrarse</router-link>
  </div>
</template>

<script>
export default {
  name: 'LandingScreen'
};
</script>

<style scoped>
/* No se necesitan estilos específicos aquí */
</style>
