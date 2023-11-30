<template>
  <div class="container">
    <h2 class="mt-5">Registrarse</h2>
    <!-- Formulario de registro -->
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-success">Registrarse</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterScreen',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    register() {
      // Aquí deberías realizar la lógica de registro
      // hacer una solicitud al servidor para crear un nuevo usuario
      const registrationSuccessful = true;

      if (registrationSuccessful) {
        // Redirigir a la sala de lobby después de un registro exitoso
        this.$router.push('/lobby');
      } else {
        // Manejar el caso en que el registro no sea exitoso
        alert('Registro fallido. Inténtalo de nuevo.');
      }
    }
  }
};
</script>

<style scoped>
/* No se necesitan estilos específicos aquí */
</style>
