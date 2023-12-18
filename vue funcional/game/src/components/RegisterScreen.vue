<template>
  <body>
    <div class="register">
      <form @submit.prevent="register" class="form">
        <h2 class="title mt-5">Registrarse</h2>
        <div class="group">
          <label for="name">Nombre de usuario</label>
          <input type="text" class="inputbox" id="name" v-model="name" required>
        </div>
        <div class="group">
          <label for="email">Email</label>
          <input type="email" class="inputbox" id="email" v-model="email" required>
        </div>
        <div class="group">
          <label for="password">Contraseña</label>
          <input type="password" class="inputbox" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-success btn-register">Registrarse</button>
      </form>
    </div>
  </body>
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
/* Updated CSS for login template with styles from the provided CSS */
@import url('https://fonts.googleapis.com/css2?family=Anek+Bangla&display=swap');

* {
  font-family: 'Anek Bangla', sans-serif;
  border-radius: 15px;
  margin: 0;
}

body {
  background-color: rgba(226, 222, 222, 0.815);
  /*background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url("/giphy.gif");*/
}

.register {
  display: grid;
  place-items: center;
  height: 100vh;
}

.title {
  font-size: 50px;
}

.form {
  min-height: auto;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  text-align: center;
  gap: 10px;
  max-width: 400px;
  background-color: #f5f5f5;
  color: #1c1c1c;
  padding: 80px;
  width: 100%;
}

.inputbox {
  margin-bottom: 20px;
  outline: none;
  width: 100%;
  padding: 10px;
}


.btn-register {
  padding: 10px;
  background-color: #1c1c1c;
  color: #f5f5f5;
  border: none;
  cursor: pointer;
  width: 106%;
  margin-top: 20px;
  transition: background-color 0.2s ease-out;
}

.btn-register:hover {
  background-color: #000000;
}
</style>
