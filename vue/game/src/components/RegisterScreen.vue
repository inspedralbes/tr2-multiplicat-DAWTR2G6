<template>
  <div class="register-container">
    <h2 class="register-title mt-5">Registrarse</h2>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="name">Nombre de usuario</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
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
      name: '',
      password: '',
      email: ''
    };
  },
  methods: {
    register() {
      fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name.trim(),
          password: this.password.trim(),
          email: this.email.trim(),
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(text => {
          try {
            return JSON.parse(text);
          } catch (error) {
            console.error('Could not parse JSON:', text);
            throw error;
          }
        })
        .then(data => {

          if (data.error) {
            alert(data.error);
            return;
          } else {
            alert('Usuario registrado correctamente');
            this.$router.push('/lobby');
          }

        })
        .catch((error) => {
          console.error('Error:', error);
        });
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
