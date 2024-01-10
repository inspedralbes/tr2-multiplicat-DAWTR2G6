<template>
  <body>
    <div class="register">
      <form @submit.prevent="register" class="form">
        <h2 class="title mt-5">Registrarse</h2>
        <div class="group">
          <input type="text" class="inputbox" placeholder="Nombre de usuario" v-model="name" required>
        </div>
        <div class="group">
          <input type="email" class="inputbox" placeholder="Correo Electrónico" v-model="email" required>
        </div>
        <div class="group">
          <input type="password" class="inputbox" placeholder="Contraseña" v-model="password" required>
        </div>
        <div class="group">
          <input type="password" class="inputbox" placeholder="Confirmar Contraseña" v-model="confirmPassword" required>
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
      confirmPassword: '',
      email: ''
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return;
      }

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
@import url('https://fonts.googleapis.com/css2?family=Anek+Bangla&display=swap');

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
  color: #673AB7; /* Púrpura profundo */
}

.form {
  box-shadow: 0 0 20px rgba(103, 58, 183, 0.6); /* Sombra más pronunciada */
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.95); /* Fondo semitransparente blanco */
  padding: 30px;
  width: 100%;
  height: auto;
}

.group {
  margin-bottom: 20px; /* Espaciado uniforme entre grupos de entrada */
}

.inputbox {
  outline: none;
  width: 100%;
  padding: 15px;
  background-color: #EDE7F6; /* Fondo lila claro */
  border: none;
  color: #333;
  border-bottom: 2px solid #673AB7; /* Línea púrpura */
  font-size: 1.2rem;
  border-radius: 5px;
  transition: background-color 0.3s ease-out; /* Transición de color al pasar el mouse */
}

.inputbox::placeholder {
  color: #757575; /* Gris suave */
}

.btn-register {
  padding: 15px;
  background-color: #673AB7; /* Púrpura */
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease-out; /* Transición de color al pasar el mouse */
  font-size: 1.2rem;
  border-radius: 5px;
}

.btn-register:hover {
  background-color: #512DA8; /* Tono más oscuro al pasar el mouse */
}
</style>
