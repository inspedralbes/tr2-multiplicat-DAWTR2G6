<template>
  <body>
    <div class="register">
      <form @submit.prevent="register" class="form">
        <h2 class="title mt-5">Registrarse</h2>
        <div class="group">
          <input type="text" class="inputbox" placeholder="Nombre de usuario" id="name" v-model="name" required>
        </div>
        <div class="group">
          <input type="email" class="inputbox" placeholder="Email" id="email" v-model="email" required>
        </div>
        <div class="group">
          <input type="password" class="inputbox" placeholder="Contraseña" id="password" v-model="password" required>
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
      fetch('http://xifraxaladag6.daw.inspedralbes.cat/backend/public/api/register', {
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
    top: -26px;
    position: relative;}

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
.inputbox::placeholder {
  color: #ffffffce;
}

.btn-register {
  padding: 13px;
    background-color: #f5f5f5;
    color: #3b3a3a;
    border: none;
    cursor: pointer;
    width: 80%;
    transition: background-color 0.2s ease-out;
    font-size: 21px;
    top: 100px;
    position: relative;
    border-radius: 30px;
}

.btn-register:hover {
  background-color: #d095e7;
}
</style>
