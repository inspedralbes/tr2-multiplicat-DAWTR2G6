<template>
  <div class="container">
    <h2 class="mt-5">Iniciar sesión</h2>
    <!-- Formulario de inicio de sesión -->
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginScreen',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      
      // hacer una solicitud al servidor para verificar credenciales
      const loginSuccessful = true;

      if (loginSuccessful) {
        // Redirigir a la sala de lobby después de un inicio de sesión exitoso
        this.$router.push('/lobby');
      } else {
        // Manejar el caso en que el inicio de sesión no sea exitoso
        alert('Inicio de sesión fallido. Verifica tus credenciales.');
      }
    }
  }
};
</script>

<style scoped>
/* No se necesitan estilos específicos aquí */
</style>
