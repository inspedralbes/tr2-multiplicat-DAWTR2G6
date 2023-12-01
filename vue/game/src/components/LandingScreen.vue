<template>
  <div class="landing-container">
    <h1 class="landing-title mt-5">LANDING-SCREEN</h1>
    <div class="landing-buttons">
      <router-link to="/login" class="landing-btn landing-btn-login mt-3">Iniciar sesión</router-link><br><br>
      <router-link to="/register" class="landing-btn landing-btn-register mt-3">Registrarse</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingScreen'
};
</script>

<style scoped>
.landing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.landing-title {
  font-family: 'Arial', sans-serif;
}

.landing-buttons {
  margin-top: 20px;
}

.landing-btn {
  display: inline-block;
  padding: 10px 20px;
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
}

.landing-btn:hover {
  background-color: #3498db;
  transform: scale(1.1);
}

.landing-btn-login {
  background-color: #2ecc71;
  color: #fff;
}

.landing-btn-register {
  background-color: #e74c3c;
  color: #fff;
}
</style>
