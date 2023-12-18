<template>
  <body>
    <div class="login">
      <form @submit.prevent="login" class="form">
        <h2 class="title">Iniciar sessió</h2>
        <div class="group">
          <label for="email">Email</label>
          <input type="email" class="inputbox" id="email" v-model="email" required>
        </div>
        <div class="group">
          <label for="password">Contrasenya</label>
          <input type="password" class="inputbox" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-primary btn-login">Iniciar sessió</button>
      </form>
    </div>

  </body>
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



<style scoped>
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

.login {
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

.btn-login {
  padding: 10px;
  background-color: #1c1c1c;
  color: #f5f5f5;
  border: none;
  cursor: pointer;
  width: 106%;
  margin-top: 20px;

  transition: background-color 0.2s ease-out;
}

.btn-login:hover {
  background-color: #000000;
}


</style>
