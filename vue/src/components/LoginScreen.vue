<template>
  <div class="greetings">
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="handleFormSubmit">
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required v-model="email">

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required v-model="password">

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleFormSubmit() {
      this.$router.push('/juego');
    },
  },
};
</script>
