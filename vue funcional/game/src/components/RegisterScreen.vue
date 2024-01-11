<template>
   <router-link to="/">
      <img src="/public/arrow.svg" alt="home" style="width:55px;height:55px;">
    </router-link>
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
        <input type="password" class="inputbox" placeholder="Contraseña" v-model="password"
          @input="checkPasswordStrength" required>
        <div class="password-strength" :class="passwordStrengthClass">{{ passwordStrength }}</div>
      </div>
      <div class="group">
        <input type="password" class="inputbox" placeholder="Confirmar Contraseña" v-model="confirmPassword" required>
      </div>
      <button type="submit" class="btn btn-success btn-register">Registrarse</button>
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
      confirmPassword: '',
      email: '',
      passwordStrength: '',
    };
  },
  methods: {
    checkPasswordStrength() {
      const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");

      if (strongRegex.test(this.password)) {
        this.passwordStrength = 'Fuerte';
      } else if (mediumRegex.test(this.password)) {
        this.passwordStrength = 'Moderada';
      } else {
        this.passwordStrength = 'Débil';
      }
    },
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
    },
    computed: {
    passwordStrengthClass() {
      if (this.passwordStrength === 'Fuerte') {
        return 'strong';
      } else if (this.passwordStrength === 'Moderada') {
        return 'moderate';
      } else {
        return ''; // Para manejar el caso de 'Débil' o cualquier otro valor
      }
    }
  }
}
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

.register {
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
  position: fixed;
  top: 20px;
  margin-left: 30px;
}

.inputbox:focus {
  background-color: #D1C4E9;
  border-color: #512DA8;
}

.password-strength{
  color: black;
}

.inputbox::placeholder {
  color: #757575;
}

.btn-register {
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

.btn-register:hover {
  background-color: #512DA8;
}
</style>