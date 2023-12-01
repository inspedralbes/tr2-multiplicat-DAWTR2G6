<template>
  <div class="login-container">
    <h2 class="login-title mt-5">Iniciar sesión</h2>
    <!-- Formulario de inicio de sesión -->
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary login-btn">Iniciar sesión</button>
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
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.login-title {
  font-family: 'Arial', sans-serif;
}

.login-form {
  width: 300px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.login-btn {
  width: 100%;
  padding: 10px;
  font-family: 'Arial', sans-serif;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
}

.login-btn:hover {
  background-color: #3498db;
  transform: scale(1.1);
}
</style>
