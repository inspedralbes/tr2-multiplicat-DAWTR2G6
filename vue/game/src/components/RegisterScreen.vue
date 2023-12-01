<template>
  <div class="register-container">
    <h2 class="register-title mt-5">Registrarse</h2>
    <!-- Formulario de registro -->
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-success register-btn">Registrarse</button>
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
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.register-title {
  font-family: 'Arial', sans-serif;
}

.register-form {
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

.register-btn {
  width: 100%;
  padding: 10px;
  font-family: 'Arial', sans-serif;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
}

.register-btn:hover {
  background-color: #2ecc71;
  transform: scale(1.1);
}
</style>
