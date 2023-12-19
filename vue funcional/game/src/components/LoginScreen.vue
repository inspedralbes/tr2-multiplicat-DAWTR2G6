<template>
  <div class="login">
    <form @submit.prevent="login" class="form">
      <h2 class="title">Iniciar sesión</h2>
      <div class="group">
        <input type="email" class="inputbox" placeholder="Email" v-model="email" required>
      </div>
      <div class="group">
        <input type="password" class="inputbox" placeholder="Contraseña" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-login" :disabled="isLoading">
        {{ isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
      </button>
      <h6 class="register-link"><router-link to="/register">No tienes cuenta?</router-link></h6>
    </form>
  </div>
</template>
<script>
export default {
  name: 'LoginScreen',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.isLoading = true;

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
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Success:', data);

          if (data.status === 1) {
            localStorage.setItem('authToken', data.access_token);
            this.$router.push('/lobby');
          } else {
            alert('Inicio de sesión fallido. Verifica tus credenciales.');
          }
        })
        .catch((error) => {
          alert('Hubo un problema durante el inicio de sesión. Inténtalo de nuevo más tarde.');
          console.error('Error:', error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
<style scoped>
* {
  font-family: 'Anek Bangla', sans-serif;
  margin: 0;
}

body {
  background-color: #0c0c28; /* Dark background color */
  color: #f5f5f5; /* Light text color */
}

.login {
  display: grid;
  place-items: center;
  height: 100vh;
}

.title {
  font-size: 50px;
  color: #ffffff;
}
a{
  color: #dc9cec;
}
.form {
  box-shadow: 0 0 10px rgba(255, 253, 253, 0.959);
    border-radius: 10px;
    text-align: center;
    max-width: 400px;
    background-color: #e5e5ec00;
    padding: 20px;
    width: 100%;
    height: 600px;
}
.inputbox::placeholder {
  color: #ffffffce;
}
.inputbox {
  outline: none;
    width: 73%;
    padding: 10px;
    background-color: #ebebf300;
    border: none;
    color: #ffffff;
    margin-bottom: 10px;
    border-bottom: 2px solid white;
    position: relative;
    font-size: 21px;
    top: 39px;


}

.btn-login {
  padding: 13px;
    background-color: #f5f5f5;
    color: #3b3a3a;
    border: none;
    cursor: pointer;
    width: 80%;
    transition: background-color 0.2s ease-out;
    font-size: 21px;
    top: 167px;
    position: relative;
    border-radius: 30px;
}

.btn-login:hover {
  background-color: #d095e7;
}

.register-link {
  text-decoration: underline;
    font-size: 18px;
    margin-top: unset;
    position: relative;
    top: 179px;
}
</style>