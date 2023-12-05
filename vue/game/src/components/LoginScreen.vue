<template>
  <div class="login-container">
    <h2 class="login-title mt-5">Iniciar sesión</h2>

    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
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
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email.trim(),
          password: this.password.trim(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);

          if (data.status === 1) {
            this.$router.push('/lobby');
          } else {
            alert('Inicio de sesión fallido. Verifica tus credenciales.');
          }
        })
        .catch((error) => {
          alert('Inicio de sesión fallido. Verifica tus credenciales.');
          console.error('Error:', error);
        });
    },
  }

}
</script>

<!-- Styles remain the same -->

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
