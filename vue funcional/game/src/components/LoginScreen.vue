<template>
  <router-link to="/">
      <img src="/public/arrow.svg" alt="home" style="width:55px;height:55px;">
    </router-link>
  <div class="login">
    <form @submit.prevent="login" class="form">
      <h2 class="title">Iniciar sesión</h2>
      <div class="group">
        <input type="email" class="inputbox" placeholder="Email" v-model="email" required>
      </div>
      <div class="group">
        <input type="password" class="inputbox" placeholder="Contraseña" v-model="password" required>
      </div>
      <h6 class="register-link"><router-link to="/register">No tienes cuenta?</router-link></h6>
      <button type="submit" class="btn btn-login" :disabled="isLoading">
        {{ isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
      </button>

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

      fetch('http://xifraxaladag6.daw.inspedralbes.cat/backend/public/api/login', {
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
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

.title {
  font-size: 2.5rem;
  margin-top: -1rem;
  color: #673AB7;
  /* Púrpura profundo */
}

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.form {
  box-shadow: 0 0 20px rgba(103, 58, 183, 0.6);
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px;
  width: 100%;
  height: auto;
}

.group {
  margin-bottom: 20px;
  position: relative;
}

.inputbox {
  outline: none;
  width: 100%;
  padding: 15px;
  background-color: #EDE7F6;
  border: none;
  color: #333;
  border-bottom: 2px solid #673AB7;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: background-color 0.3s ease-out, border-color 0.3s ease-out;
}

a{
  top: 20px;
  margin-left: auto;
;}

.inputbox:focus {
  background-color: #D1C4E9;
  border-color: #512DA8;
}

.btn-login {
  padding: 15px;
  background-color: #673AB7;
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease-out;
  font-size: 1.2rem;
  border-radius: 5px;
}

.btn-login:hover {
  background-color: #512DA8;
}

.register-link {
  text-decoration: underline;
  font-size: 1.2rem;
}
</style>
